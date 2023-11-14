<script lang="ts" setup>
const store = useTypesStore()
const { newType } = storeToRefs(store)

const stateModel = computed(() => {
  if (props.action === 'new') {
    return newType.value
  } else {
    const typeId = useRoute().params.id
    const type = store.types?.filter(type => type.id == typeId)
    return type[0]
  }
})

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

const validate = (): FormError[] => {
  const errors = []
  if (!stateModel.value.type || stateModel.value.type.length < 3) { errors.push({ path: 'type', message: 'Required' }) }
  if (!stateModel.value.tax || stateModel.value.tax < 0) { errors.push({ path: 'tax', message: 'Required' }) }
  return errors
}
</script>

<template>
  <section>
    <UForm :validate="validate" :state="stateModel" @submit="props.submit">
      <UFormGroup class="pb-3" label="Type name" name="type">
        <UInput v-model="stateModel.type" maxlength="10" />
      </UFormGroup>

      <UFormGroup class="pb-3" :label="`Tax (${stateModel.tax}%)`" name="tax">
        <label for="range" class="sr-only" />
        <URange id="range" v-model="stateModel.tax" name="range" :step="0.01" :max="100" />
        <UInput v-model.number="stateModel.tax" type="number" step="0.01" min="0" max="100">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
          </template>
        </UInput>
      </UFormGroup>

      <UButton type="submit">
        Save
      </UButton>
    </UForm>
  </section>
</template>

<style scoped></style>
