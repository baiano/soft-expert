<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'i-heroicons-shopping-cart-20-solid',
  },
  number: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: 'Total:',
  },
})
</script>

<template>
  <UCard>
    <div class="flex text-2xl space-x-2">
      <UIcon :name="props.icon" class="text-3xl mr-2" />
      <span class="font-bold">{{ props.title }}</span>
      <span>{{ props.number }}</span>
    </div>
  </UCard>
</template>

<style scoped></style>
