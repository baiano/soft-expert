<script setup>
const { $auth } = useNuxtApp()

onMounted(() => {
  $auth.onAuthStateChanged((user) => {
    if (!user) {
      useRouter().push('/login')
    }
  })
})
</script>
<template>
  <div class="min-h-screen">
    <Navbar />
    <UContainer class="p-3 mt-3 grow">
      <NuxtPage />
    </UContainer>
    <Footer class="sticky top-[100vh]" />
  </div>
</template>

<style scoped></style>
