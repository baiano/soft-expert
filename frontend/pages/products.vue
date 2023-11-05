<script setup>
const store = useProductStore()
const { columns, page, rowsPerPage, searchTerm } = storeToRefs(store)
function typeName (row) {
  return row.types.map((type) => type.type).join(', ')
}

watch(searchTerm, () => {
  page.value = 1
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
      <UButton
        label="fake products"
        color="primary"
        variant="solid"
        icon="i-heroicons-plus-circle-20-solid"
        class="justify-self-end ml-3"
        @click="store.fakeProducts"
      />
    </div>
    <UTable :columns="columns" :rows="store.getProductsFiltered" :sort="{ column: 'product' }">
      <template #types-data="{ row }">
        <span class="text-primary">{{ typeName(row) }}</span>
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
