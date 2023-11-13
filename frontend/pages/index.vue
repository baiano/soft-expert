<script lang="ts" setup>
const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

const typesStore = useTypesStore()

const ordersStore = useOrdersStore()
const { orders } = storeToRefs(ordersStore)

// Mock data for demonstration
onMounted(async () => {
  await productsStore.fetchProducts()
  await typesStore.fetchTypes()
  await ordersStore.fetchOrders()
})
</script>

<template>
  <div class="grid grid-cols-2 gap-5 justify-center">
    <DashboardInfoBox :icon="'i-heroicons-shopping-cart-20-solid'" :number="products?.length" title="Total Products:" />
    <DashboardInfoBox :icon="'i-heroicons-shopping-cart-20-solid'" :number="orders?.length" title="Orders:" />

  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
