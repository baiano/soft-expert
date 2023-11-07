<script setup>
const store = useOrdersStore()
const { newOrderColumns } = storeToRefs(store)
const order = ref({})
const columns = ref([])
// all columns except actions

onMounted(async () => {
  order.value = await store.getOrder(useRoute().params.id)
  columns.value = newOrderColumns.value.filter(column => column.key !== 'actions')
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
      <h1 class="text-xl">
        Order: #{{ order?.id }}
      </h1>
    </div>
    <OrderProductsTable :rows="order?.products" :columns="columns" />
  </section>
</template>
