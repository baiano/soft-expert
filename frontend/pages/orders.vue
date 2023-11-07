<script setup>
const store = useOrdersStore()
const { columns } = storeToRefs(store)
const configStore = useConfigStore()
const { page, rowsPerPage, searchTerm } = storeToRefs(configStore)

watch(searchTerm, () => {
  page.value = 1
})

onMounted(async () => {
  page.value = 1
  await store.fetchOrders()
})
</script>

<template>
  <section>
    <div class="grid pb-5 border-b border-gray-200 dark:border-gray-700">
      <UButton
        label="New Order"
        color="primary"
        variant="solid"
        to="/order/new"
        icon="i-heroicons-plus-circle-20-solid"
        class="justify-self-end ml-3"
      />
    </div>
    <UTable :columns="columns" :rows="store.getOrdersFiltered" :sort="{ column: 'product' }">
      <template #quantity-data="{ row }">
        <span class="text-primary">{{ store.productsQuantity(row.products) }}</span>
      </template>

      <template #value-data="{ row }">
        <span>${{ store.calculateOrderValue(row).toFixed(2) }}</span>
      </template>

      <template #total-data="{ row }">
        <span>${{ store.calculateOrderTotal(row).toFixed(2) }}</span>
      </template>

      <template #tax-data="{ row }">
        <span>${{ store.calculateOrderTax(row).toFixed(2) }}</span>
      </template>

      <template #created_at-data="{ row }">
        <span>{{ new Date(row.created_at).toLocaleDateString() + ' ' + new Date(row.created_at).toLocaleTimeString() }}</span>
      </template>

      <template #actions-data="{ row }">
        <div class="text-right">
          <UButton color="gray" variant="solid" label="View details" icon="i-heroicons-eye-20-solid" />
        </div>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="rowsPerPage" :total="store.getItemsCount" />
    </div>
  </section>
</template>

<style scoped></style>
