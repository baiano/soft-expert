<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
const store = useTypesStore()
const { types, newType } = storeToRefs(store)

const validate = (): FormError[] => {
  const errors = []
  // if (!newProduct.value.product) { errors.push({ path: 'product', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  console.log(event.data)
  useRouter().push('/types')
}

onMounted(() => {
  newType.value = {
    type: '',
  }
})
</script>

<template>
  <!-- go back -->
  <section>
    <div class="flex justify-start items-center pb-5 
     border-b border-gray-200 dark:border-gray-700 mb-3">
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
      <UFormGroup class="pb-3" label="Product name" name="product">
        <UInput v-model="newProduct.product" maxlength="10" />
      </UFormGroup>

      <UFormGroup class="pb-3" label="Type" name="type">
        <USelectMenu
          v-model="newProduct.type"
          searchable
          searchable-placeholder="Search a type..."
          class="w-full"
          placeholder="Select a type"
          :options="useTypesStore().types"
          option-attribute="type"
        >
      
        </USelectMenu>
      </UFormGroup>

      <UFormGroup class="pb-3" label="Price" name="price">
        <UInput v-model.number="newProduct.price" />
      </UFormGroup>
      <span class="block">Tax: ${{ store.calculateTax({...newProduct, quantity: 1}) }} </span>
      <span class="block pb-3">Total price: ${{ store.calculateTaxedPrice({...newProduct, quantity: 1}) }} </span>

      <UButton type="submit">
        Save
      </UButton>
        
    </UForm>
  </section>
</template>

<style scoped></style>
