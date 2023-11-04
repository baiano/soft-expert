<script setup>
const store = useProductStore()
const { columns, page, rowsPerPage, searchTerm } = storeToRefs(store)
</script>

<template>
  <section>
    <UButton
      class="my-3"
      label="New Product"
      color="primary"
      variant="solid"
      to="/product/new"
      icon="i-heroicons-plus-circle-20-solid"
    />
    <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="searchTerm" placeholder="Filter products..." />
    </div>
    <UTable :columns="columns" :rows="store.getProductsFiltered" :sort="{ column: 'product' }">
      <template #types-data="{ row }">
        <span class="text-primary">{{ row.types.join(', ') }}</span>
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
