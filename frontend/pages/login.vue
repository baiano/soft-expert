<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


definePageMeta({
  layout: 'guest',
})

const store = useUserStore()
const { registerModalIsOpen, userLogin, forgotPasswordModalIsOpen } = storeToRefs(store)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}

onMounted(() => {
  onAuthStateChanged(getAuth(), async (user) => {
    console.log('user', user)
    if (user) {
      useRouter().push('/')
      useUserStore().token = await user.getIdToken()
    }
  })
})
</script>
<template>
  <!-- vertical center in middle -->
  <div class="flex flex-col items-center justify-center h-screen">
    <UCard class="h-92 mb-52">
      <template #header>
        <h1 class="text-xl">
          Login
        </h1>
      </template>
      <UForm class="max-w-md" :validate="validate" :state="userLogin" @submit="store.loginUser">
        <UFormGroup label="Email" name="email">
          <UInput v-model="userLogin.email" type="email" />
        </UFormGroup>

        <UFormGroup class="my-4" label="Password" name="password">
          <UInput v-model="userLogin.password" type="password" />
        </UFormGroup>

        <div class="flex justify-between items-center">
          <UButton type="submit">
            Login
          </UButton>
        </div>
      </UForm>
      <UModal v-model="registerModalIsOpen">
        <RegisterFormModal />
      </UModal>
      <UModal v-model="forgotPasswordModalIsOpen">
        <RegisterForgotPasswordRequest />
      </UModal>
      <template #footer>
        <div class="flex justify-between items-center">
          <div>
            <span class="text-primary" @click="registerModalIsOpen = true">
              Sign Up
            </span>
            <span class="mx-2">|</span>
            <span @click="forgotPasswordModalIsOpen = true">
              Forgot Password?
            </span>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style scoped></style>
