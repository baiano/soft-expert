<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
const store = useTypesStore()
const { newType } = storeToRefs(store)

const validate = (): FormError[] => {
  const errors = []
  // if (!newType.value.product) { errors.push({ path: 'product', message: 'Required' }) }
  if (!newType.value.type || newType.value.type.length < 3) { errors.push({ path: 'type', message: 'Required' }) }
  if (!newType.value.tax || newType.value.tax < 0) { errors.push({ path: 'tax', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  await store.types.push({ ...event.data, id: store.types.length + 1, tax: event.data.tax / 100 })
  newType.value = { type: '', tax: 0.00 }
  useRouter().push('/types')
}

onMounted(() => {
  newType.value = {
    type: '',
    tax: 0.00,
  }
})
</script>

<template>
  <!-- go back -->
  <section>
    <div
      class="flex justify-start items-center pb-5
     border-b border-gray-200 dark:border-gray-700 mb-3"
    >
      <UButton
        color="primary"
        variant="solid"
        icon="i-heroicons-arrow-left-20-solid"
        @click="useRouter().push('/types')"
      />
      <div class=" ms-3">
        <h1>New Product</h1>
      </div>
    </div>
    <UForm :validate="validate" :state="newType" @submit="onSubmit">
      <UFormGroup class="pb-3" label="Type name" name="type">
        <UInput v-model="newType.type" maxlength="10" />
      </UFormGroup>

      <UFormGroup class="pb-3" :label="`Tax (${newType.tax}%)`" name="tax">
        <label for="range" class="sr-only" />
        <URange id="range" v-model="newType.tax" name="range" :step="0.01" :max="100" />
        <UInput v-model.number="newType.tax" type="number" step="0.01" min="0" max="100">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
          </template>
        </UInput>
      </UFormGroup>

      <UButton type="submit">
        Save
      </UButton>
    </UForm>
  </section>
</template>

<style scoped></style>
