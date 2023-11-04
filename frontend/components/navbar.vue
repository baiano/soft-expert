<script lang="ts" setup>
const store = useConfigStore()
const { isNavbarVisible } = storeToRefs(store)
const productsMenu = ref([
  [{
    label: 'New Product',
    icon: 'i-heroicons-plus-circle-20-solid',
    to: '/product/new',
  }],
  [{
    label: 'All Products',
    icon: 'i-heroicons-clipboard-document-list-20-solid',
    to: '/products',
  }]
])

const isProductPage = computed(() => {
  // useRoute().path has /product* in it
  return useRoute().path.includes('product')
})

</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center">
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
        <USkeleton class="ml-2 h-6 w-32" :ui="{ rounded: 'rounded-full' }" />
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
        @click="isNavbarVisible = !isNavbarVisible"
      >
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div id="navbar-default" class="w-full md:block md:w-auto" :class="!isNavbarVisible ? 'hidden' : ''">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <ULink
              to="/"
              active-class="text-primary"
            >
              Home
            </ULink>
          </li>
          <li>
            <UDropdown
              :items="productsMenu"
              mode="hover"
              :popper="{ placement: 'bottom-start' }"
              class="flex items-center"
            >
              <!-- if route has /product* it is true -->
              <span :class="isProductPage ? 'text-primary' : ''">
                Products
              </span>
              <UIcon class="text-lg pt-6 pl-7" name="i-heroicons-chevron-down-20-solid" />
            </UDropdown>
          </li>
          <li>
            <ULink
              to="/logout"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <UIcon class="hidden md:block pr-7 text-2xl text-red-400 font-bold" name="i-solar-logout-broken" title="Logout" />
              <!-- show only on small screens -->
              <span class="md:hidden text-red-400">
                Logout
              </span>
            </ULink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#navbar-default ul li{
  padding: 0.5rem 0;
}
</style>
