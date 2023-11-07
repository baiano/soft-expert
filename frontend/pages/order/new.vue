<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
const store = useOrdersStore()
const { newOrder, newOrderColumns } = storeToRefs(store)

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

const productToAdd = ref({ product: { product: 'Select' }, quantity: 0 })
const formAddProduct = ref<HTMLInputElement>()

const validate = (): FormError[] => {
  const errors = []
  // if (!newType.value.product) { errors.push({ path: 'product', message: 'Required' }) }
  if (!productToAdd.value.product?.id) { errors.push({ path: 'product', message: 'Required' }) }
  if (!productToAdd.value.quantity || productToAdd.value.quantity < 1) { errors.push({ path: 'quantity', message: 'Required' }) }
  return errors
}

function onSubmit (event: FormSubmitEvent<any>) {
  newOrder.value.products.push({ ...productToAdd.value, id: newOrder.value.products.length + 1 })
  productToAdd.value = { product: { product: 'Select' }, quantity: 0 }
  // useRouter().push('/orders')
}

onMounted(() => {
  newOrder.value = {
    products: [],
  }
})
</script>

<template>
  <section>
    <div
      class="flex justify-start items-center pb-5
     border-b border-gray-200 dark:border-gray-700 mb-3"
    >
      <UButton
        color="primary"
        variant="solid"
        class="me-3"
        icon="i-heroicons-arrow-left-20-solid"
        @click="useRouter().push('/orders')"
      />
      <div>
        <h1>New Order</h1>
      </div>
    </div>
    <UForm ref="formAddProduct" class="flex flex-row pb-5 mb-3" :validate="validate" :state="newOrder" @submit="onSubmit">
      <UFormGroup label="Product" class="grow" name="product">
        <!-- on change focus next input -->
        <USelectMenu
          v-model="productToAdd.product"
          searchable
          class="flex-1"
          searchable-placeholder="Search for a product..."
          placeholder="Select a product"
          :options="products"
          option-attribute="product"
        />
      </UFormGroup>
      <UFormGroup label="Qty" class="w-20" name="quantity">
        <UInput v-model="productToAdd.quantity" step="1" max="99" type="number" />
      </UFormGroup>
      <UFormGroup label="&nbsp;" class="w-20">
        <UButton
          type="submit"
          icon="i-heroicons-plus-circle-20-solid"
        >
          Add
        </UButton>
      </UFormGroup>
    </UForm>

    <OrderProductsTable :rows="newOrder.products" :columns="newOrderColumns" />

    <!-- save order -->
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UButton class="mx-3" color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" @click="newOrder = { products: []}">
        Clear
      </UButton>

      <UButton
        color="primary"
        variant="solid"
        icon="i-material-symbols-shopping-cart-checkout"
        :disabled="newOrder.products.reduce((acc, cur) => acc + cur.quantity, 0) === 0"
        @click="store.saveOrder"
      >
        Save
      </UButton>
    </div>
  </section>
</template>

<style scoped></style>
