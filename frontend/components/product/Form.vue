<script lang="ts" setup>
const store = useProductsStore()
const { newProduct } = storeToRefs(store)

const stateModel = computed(() => {
  if (props.action === 'new') {
    return newProduct.value
  } else {
    const productId = useRoute().params.id
    const product = store.products.filter(product => product.id == productId)
    return product[0]
  }
})

const validate = (): FormError[] => {
  const errors = []
  if (!stateModel.value.product) { errors.push({ path: 'product', message: 'Required' }) }
  if (stateModel.value.price === 0) { errors.push({ path: 'price', message: 'Price must be greater than 0' }) }
  if (!stateModel.value.price) { errors.push({ path: 'price', message: 'Required' }) }
  if (!stateModel.value.type?.id) { errors.push({ path: 'type', message: 'Required' }) }
  return errors
}

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <section>
    <UForm :validate="validate" :state="stateModel" @submit="props.submit">
      <UFormGroup class="pb-3" label="Product name" name="product">
        <UInput v-if="stateModel" v-model="stateModel.product" maxlength="100" />
      </UFormGroup>

      <UFormGroup class="pb-3" label="Type" name="type">
        <USelectMenu
          v-if="stateModel"
          v-model="stateModel.type"
          searchable
          searchable-placeholder="Search a type..."
          class="w-full"
          placeholder="Select a type"
          :options="useTypesStore().types"
          option-attribute="type"
        />
      </UFormGroup>

      <UFormGroup class="pb-3" label="Price" name="price">
        <UInput v-if="stateModel" v-model.number="stateModel.price" />
      </UFormGroup>
      <span class="block">Tax: ${{ (stateModel.type.tax / 100 * stateModel.price).toFixed(2) }} </span>
      <span class="block pb-3">Total price: ${{ ((stateModel.type.tax / 100 * stateModel.price) + stateModel.price).toFixed(2)  }} </span>

      <UButton type="submit">
        Save
      </UButton>
    </UForm>
  </section>
</template>

<style scoped></style>
