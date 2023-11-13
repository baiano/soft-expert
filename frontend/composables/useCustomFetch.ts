import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export async function useCustomFetch<T> (url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const configStore = useConfigStore()
  const { $auth } = useNuxtApp()
  const token = (await $auth?.currentUser?.getIdToken()) ?? useUserStore().token 
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const defaults: UseFetchOptions<T> = {
    baseURL: configStore.apiUrl ?? 'http://localhost:8080/api',
    // this overrides the default key generation, which includes a hash of
    // url, method, headers, etc. - this should be used with care as the key
    // is how Nuxt decides how responses should be deduplicated between
    // client and server
    key: url,

    // set user token if connected
    headers,

    onResponse (_ctx) {
      // _ctx.response._data = _ctx.response.data
    },

    onResponseError (_ctx) {
      // throw new myBusinessError()
    },
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)
  const result = await useFetch(url, params)
  return result.data
}
