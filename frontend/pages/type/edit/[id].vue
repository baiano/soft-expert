<script setup>
const store = useTypesStore()
async function onSubmit () {
  await store.update(store.getTypeFromUrl)
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
        @click="useRouter().push('/types')"
      />
      <div class=" ms-3">
        <h1>Editing Product Type</h1>
      </div>
    </div>
    <TypeForm :action="'edit'" @submit="onSubmit" />
  </section>
</template>
