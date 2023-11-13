<script lang="ts" setup>
const store = useUserStore()
const { userToRegister } = storeToRefs(store)

const formRegister = ref(null)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  if (state.confirmPassword !== state.password) { errors.push({ path: 'confirmPassword', message: 'Passwords must match' }) }
  return errors
}
</script>

<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <span class="text-xl">Sign up</span>
    </template>

    <UForm :validate="validate" :state="userToRegister" @submit="store.createUser">
      <UFormGroup label="Email" name="email">
        <UInput v-model="userToRegister.email" type="email" maxlength="150" />
      </UFormGroup>

      <UFormGroup class="my-4" label="Password" name="password">
        <UInput v-model="userToRegister.password" type="password" maxlength="150" />
      </UFormGroup>

      <UFormGroup class="my-4" label="Confirm Password" name="confirmPassword">
        <UInput v-model="userToRegister.confirmPassword" type="password" maxlength="150" />
      </UFormGroup>
      <UButton class="" type="submit">
        Sign up
      </UButton>
    </UForm>

    <template #footer>
      <div class="flex justify-end items-center">
        <UButton class="mx-3" type="button" variant="ghost" @click="store.registerModalIsOpen = false">
          Cancel
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<style scoped></style>
