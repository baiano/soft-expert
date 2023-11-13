import { setup } from '@nuxt/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach
} from 'vitest'

import { useProductsStore } from './products'

beforeAll(() => {
  setActivePinia(createPinia())

  setup({
    server: false,
    configFile: 'nuxt.config.ts',
  })
})

describe('Products Store', () => {
  let store
  const fakeProduct = {
    product: 'Beer',
    type: {
      id: 5,
      type: 'Alcohol',
      tax: 0.3,
    },
    price: 2.49,
  }

  beforeEach(async () => {
    store = useProductsStore()
    await store.fetchProducts()
  })

  describe('calculateTax', () => {
    test('calculates tax', () => {
      expect(store.calculateTax(fakeProduct)).toBe('0.75')
    })
  })
})
