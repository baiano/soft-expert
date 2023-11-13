<?php
namespace Backend\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class FirebaseService
{
    private $configJson;
    private string $projectId;
    private string $publicKeysEndpoint = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

    public function __construct()
    {
        $this->configJson = self::createConfig();
        $this->projectId = $this->configJson['projectId'];
    }

    public static function createConfig()
    {
        $env = parse_ini_file('.env');
        $config = [
            'apiKey' => $env['FIREBASE_API_KEY'],
            'authDomain' => $env['FIREBASE_AUTH_DOMAIN'],
            'projectId' => $env['FIREBASE_PROJECT_ID'],
            'storageBucket' => $env['FIREBASE_STORAGE_BUCKET'],
            'messagingSenderId' => $env['FIREBASE_MESSAGING_SENDER_ID'],
            'appId' => $env['FIREBASE_APP_ID'],
        ];
        return $config;
    }

    public function verifyIdToken(string $idToken): ?string
    {
        try {
            // Decode the ID token without verification to extract header
            $decodedHeader = JWT::jsonDecode(JWT::urlsafeB64Decode(explode('.', $idToken)[0]), true);
    
            // Verify the algorithm
            if (!isset($decodedHeader->alg) || $decodedHeader->alg !== 'RS256') {
                throw new \Exception('Invalid algorithm');
            }
            // Fetch public keys from Google
            $publicKeys = $this->fetchPublicKeys();
    
            // Decode the token as an associative array
            $headers = new \stdClass();
            $decodedTokenArray = (array)JWT::decode($idToken, new Key($publicKeys[$decodedHeader->kid], 'RS256'), $headers);
            // Verify other claims
            $this->verifyClaims((object)$decodedTokenArray);
            // Return the UID (subject) if verification is successful
            return $decodedTokenArray['sub'];
        } catch (\Exception $e) {
            // Handle verification errors
            return false;
        }
    }
    


    private function fetchPublicKeys(): array
    {
        $response = file_get_contents($this->publicKeysEndpoint);
        $keys = json_decode($response, true);

        $publicKeys = [];
        foreach ($keys as $kid => $key) {
            $publicKeys[$kid] = $key;
        }
        return $publicKeys;
    }

    private function verifyClaims(object $decodedToken): void
    {
        $now = time();

        // Verify expiration time (exp)
        if (!isset($decodedToken->exp) || $decodedToken->exp <= $now) {
            throw new \Exception('Token has expired');
        }

        // Verify issued-at time (iat)
        if (!isset($decodedToken->iat) || $decodedToken->iat > $now) {
            throw new \Exception('Invalid issued-at time');
        }

        // Verify audience (aud)
        if (!isset($decodedToken->aud) || $decodedToken->aud !== $this->projectId) {
            throw new \Exception('Invalid audience');
        }

        // Verify issuer (iss)
        $expectedIssuer = "https://securetoken.google.com/{$this->projectId}";
        if (!isset($decodedToken->iss) || $decodedToken->iss !== $expectedIssuer) {
            throw new \Exception('Invalid issuer');
        }

        // Verify subject (sub)
        if (!isset($decodedToken->sub) || empty($decodedToken->sub)) {
            throw new \Exception('Invalid subject');
        }

        // Verify authentication time (auth_time)
        if (!isset($decodedToken->auth_time) || $decodedToken->auth_time > $now) {
            throw new \Exception('Invalid authentication time');
        }
    }

}
