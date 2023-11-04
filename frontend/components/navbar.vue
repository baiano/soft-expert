<script lang="ts" setup>
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center">
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
        <USkeleton class="ml-2 h-6 w-32" :ui="{ rounded: 'rounded-full' }" />
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div id="navbar-default" class="hidden w-full md:block md:w-auto">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products">
              Products
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/logout" class="flex items-center">
              <UIcon class="pr-7" name="i-solar-logout-broken" />
              <span>
                Logout
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
