<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
const store = useProductStore()
const { newProduct, products } = storeToRefs(store)

const validate = (): FormError[] => {
  const errors = []
  if (!newProduct.value.product) { errors.push({ path: 'product', message: 'Required' }) }
  if (newProduct.value.price === 0) { errors.push({ path: 'price', message: 'Price must be greater than 0' }) }
  if (!newProduct.value.price) { errors.push({ path: 'price', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  console.log(event.data)
  await products.value.push({ ...event.data, id: products.value.length + 1 })
  newProduct.value = { product: '', types: [], price: 0 }
  useRouter().push('/products')
}

onMounted(() => {
  store.fakeProducts()
})
</script>

<template>
  <UForm :validate="validate" :state="newProduct" @submit="onSubmit">
    <UFormGroup class="pb-3" label="Product name" name="product">
      <UInput v-model="newProduct.product" maxlength="10" />
    </UFormGroup>

    <UFormGroup class="pb-3" label="Type" name="type">
      <USelectMenu
        v-model="newProduct.type"
        searchable
        searchable-placeholder="Search a type..."
        class="w-full h-max"
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
</template>

<style scoped></style>
