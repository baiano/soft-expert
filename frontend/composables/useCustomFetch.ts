import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export function useCustomFetch<T> (url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const store = useUserStore()
  const configStore = useConfigStore()

  const defaults: UseFetchOptions<T> = {
    baseURL: configStore.apiUrl ?? 'http://localhost:8080/api',
    // this overrides the default key generation, which includes a hash of
    // url, method, headers, etc. - this should be used with care as the key
    // is how Nuxt decides how responses should be deduplicated between
    // client and server
    key: url,

    // set user token if connected
    headers: store.token
      ? { Authorization: `Bearer ${store.token}` }
      : {},

    onResponse (_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError (_ctx) {
      // throw new myBusinessError()
    },
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
