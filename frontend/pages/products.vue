<script setup>
const store = useProductsStore()
const { columns } = storeToRefs(store)
const configStore = useConfigStore()
const { page, rowsPerPage, searchTerm } = storeToRefs(configStore)
function typeName (row) {
  return row.type?.type
}

watch(searchTerm, () => {
  page.value = 1
})

onMounted(async () => {
  page.value = 1
  await store.fetchProducts()
})
</script>

<template>
  <section>
    <div class="grid grid-cols-2 pb-5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="searchTerm" class="justify-self-start" placeholder="Filter products..." />
      <UButton
        label="New Product"
        color="primary"
        variant="solid"
        to="/product/new"
        icon="i-heroicons-plus-circle-20-solid"
        class="justify-self-end ml-3"
      />
    </div>
    <UTable :columns="columns" :rows="store.getProductsFiltered" :sort="{ column: 'product' }">
      <template #type-data="{ row }">
        <span class="text-primary">{{ typeName(row) }}</span>
      </template>

      <template #price-data="{ row }">
        <span>${{ row.price.toFixed(2) }}</span>
      </template>

      <template #tax-data="{ row }">
        <span>${{ store.calculateTax({...row, quantity: 1}) }}</span>
      </template>
      <template #total-data="{ row }">
        <span class="text-primary">${{ store.calculateTaxedPrice({...row, quantity: 1}) }}</span>
      </template>
      <template #actions-data="{ row }">
        <div class="text-right">
          <UDropdown :items="store.tableActions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </div>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="rowsPerPage" :total="store.getItemsCount" />
    </div>
  </section>
</template>

<style scoped></style>
