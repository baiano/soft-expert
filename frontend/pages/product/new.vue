<script setup lang="ts">
const store = useProductsStore()
const { newProduct } = storeToRefs(store)

async function onSubmit () {
  await store.saveProduct()
}

onMounted(() => {
  newProduct.value = { product: '', type: { type: 'Select' }, price: 0 }
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
        @click="useRouter().push('/products')"
      />
      <div class=" ms-3">
        <h1>New Product</h1>
      </div>
    </div>
    <ProductForm :action="'new'" :submit="onSubmit" />
  </section>
</template>

<style scoped></style>
