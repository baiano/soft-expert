<script lang="ts" setup>
const store = useUserStore()
const { userToResetPassword } = storeToRefs(store)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}
</script>

<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <span class="text-xl">Forgot your password?</span>
    </template>
    <p class="mb-3">
      Enter your email address and we will send you a link to reset your password.
    </p>
    <UForm :validate="validate" :state="userToResetPassword" @submit="store.recoverPassword">
      <UFormGroup label="Email" name="email">
        <UInput v-model="userToResetPassword.email" type="email" maxlength="150" />
      </UFormGroup>

      <UButton class="mt-3" type="submit">
        Recover
      </UButton>
    </UForm>

    <template #footer>
      <div class="flex justify-end items-center">
        <UButton class="mx-3" type="button" variant="ghost" @click="store.forgotPasswordModalIsOpen = false">
          Cancel
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<style scoped></style>
