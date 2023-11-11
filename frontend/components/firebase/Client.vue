<script lang="ts" setup>
import { initializeApp } from '@firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const config = useRuntimeConfig()

const firebaseConfig = {
  apiKey: config.public.firebaseApiKey,
  authDomain: config.public.firebaseAuthDomain,
  databaseURL: config.public.firebaseDatabaseURL,
  projectId: config.public.firebaseProjectId,
  storageBucket: config.public.firebaseStorageBucket,
  messagingSenderId: config.public.firebaseMessagingSenderId,
  appId: config.public.firebaseAppId,
}

onMounted(async () => {
  nextTick()

  await initializeApp(firebaseConfig)
  const firebaseApp = await initializeApp(firebaseConfig)
  const auth = await getAuth(firebaseApp)
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      useRouter().push('/login')
    } else {
      useUserStore().token = await user.getIdToken()
    }
  })
})
</script>
<template>
  <div />
</template>
