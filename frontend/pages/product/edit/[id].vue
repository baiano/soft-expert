<script setup>
const store = useProductsStore()
async function onSubmit () {
  await store.updateProduct(store.getProductFromUrl)
}
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
        icon="i-heroicons-arrow-left-20-solid"
        @click="useRouter().push('/products')"
      />
      <div class=" ms-3">
        <h1>Editing Product</h1>
      </div>
    </div>
    <ProductForm :action="'edit'" @submit="onSubmit" />
  </section>
</template>
