<script lang="ts" setup>
const store = useOrdersStore()
const productsStore = useProductsStore()
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <UTable
      :columns="props.columns"
      :rows="props.rows"
      :sort="{ column: 'product' }"
    >
    <template #id-data="{ row }">
        <span>{{ row.product.id }}</span>
      </template>
      <template #product-data="{ row }">
        <span class="text-primary">{{ row.product.product }}</span>
      </template>
      <template #type-data="{ row }">
        <span>{{ row.product.type.type }}</span>
      </template>
      <template #price-data="{ row }">
        <span>${{ row.product.price.toFixed(2) }}</span>
      </template>
      <template #value-data="{ row }">
        <span class="">${{ (row.product.price * row.quantity).toFixed(2) }}</span>
      </template>
      <template #tax-data="{ row }">
        <span class="">${{ productsStore.calculateTax({...row.product, quantity: row.quantity}) }}</span>
      </template>
      <template #total-data="{ row }">
        <span class="text-primary">${{ productsStore.calculateTaxedPrice({...row.product, quantity: row.quantity}) }}</span>
      </template>
      <template #actions-data="{ row }">
        <div class="text-right">
          <UDropdown :items="store.tableActions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </div>
      </template>
    </UTable>
  </div>
</template>

<style scoped></style>
