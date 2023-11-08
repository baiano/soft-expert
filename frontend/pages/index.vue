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
    <DashboardInfoBox :icon="'i-heroicons-shopping-cart-20-solid'" :number="products.length" title="Total Products:" />
    <DashboardInfoBox :icon="'i-heroicons-shopping-cart-20-solid'" :number="orders.length" title="Orders:" />

    <UCard class="col-span-2">
      <div class="flex items-center">
        <UIcon name="history" class="text-3xl" />
        <span class="text-2xl font-bold">Last products added: </span>
      </div>
      <ul>
        <li v-for="product in products.slice(-5).reverse() " :key="product.id">
          {{ product.product }}
        </li>
      </ul>
      <!-- see all -->
      <div class="flex justify-end">
        <ULink
          class="text-sm font-bold"
          :to="{ name: 'products' }"
          :label="'See all'"
        >
          See all
        </ULink>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
