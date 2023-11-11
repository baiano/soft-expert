<?php
namespace Backend\Services;

use Firebase\JWT\JWT;

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
            if (!isset($decodedHeader['alg']) || $decodedHeader['alg'] !== 'RS256') {
                throw new \Exception('Invalid algorithm');
            }

            // Fetch public keys from Google
            $publicKeys = $this->fetchPublicKeys();

            // Verify the signature using the appropriate public key
            $decodedToken = JWT::decode($idToken, $publicKeys[$decodedHeader['kid']], ['RS256']);

            // Verify other claims
            $this->verifyClaims($decodedToken);

            // Return the UID (subject) if verification is successful
            return $decodedToken->sub;
        } catch (\Exception $e) {
            // Handle verification errors
            return null;
        }
    }

    private function fetchPublicKeys(): array
    {
        $response = file_get_contents($this->publicKeysEndpoint);
        $keys = json_decode($response, true);

        $publicKeys = [];
        foreach ($keys as $kid => $key) {
            $publicKeys[$kid] = '-----BEGIN CERTIFICATE-----' . PHP_EOL . $key . PHP_EOL . '-----END CERTIFICATE-----';
        }

        return $publicKeys;
    }

    private function verifyClaims(object $decodedToken): void
    {
        $now = time();

        if (!isset($decodedToken->exp) || $decodedToken->exp <= $now) {
            throw new \Exception('Token has expired');
        }

        if (!isset($decodedToken->iat) || $decodedToken->iat > $now) {
            throw new \Exception('Invalid issued-at time');
        }

        if (!isset($decodedToken->aud) || $decodedToken->aud !== $this->projectId) {
            throw new \Exception('Invalid audience');
        }

        $expectedIssuer = "https://securetoken.google.com/{$this->projectId}";
        if (!isset($decodedToken->iss) || $decodedToken->iss !== $expectedIssuer) {
            throw new \Exception('Invalid issuer');
        }

        if (!isset($decodedToken->sub) || empty($decodedToken->sub)) {
            throw new \Exception('Invalid subject');
        }

        if (!isset($decodedToken->auth_time) || $decodedToken->auth_time > $now) {
            throw new \Exception('Invalid authentication time');
        }
    }
}
