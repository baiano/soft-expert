<script setup lang="ts">
const store = useTypesStore()
const { newType } = storeToRefs(store)

async function onSubmit () {
  await store.saveType()
}

onMounted(() => {
  newType.value = {
    type: '',
    tax: 0.00,
  }
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
        @click="useRouter().push('/types')"
      />
      <div class=" ms-3">
        <h1>New Product Type</h1>
      </div>
    </div>
    <TypeForm :action="'new'" :submit="onSubmit" />
  </section>
</template>

<style scoped></style>
