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
  let productTest
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

  describe('fetchProducts', () => {
    test('fetches products', async () => {
      expect(store.products.length).toBeGreaterThan(0)
    })
  })

  describe('saveProduct', () => {
    test('saves product', async () => {
      store.newProduct = fakeProduct
      productTest = await store.saveProduct(true)
      expect(productTest.id).toBeDefined()
    })
  })

  describe('update product', () => {
    test('product can be updated', async () => {
      productTest.product = 'Beer (UPDATED)'
      productTest.type = fakeProduct.type
      await store.updateProduct(productTest, true)
      expect(store.products).toContainEqual(productTest)
    })
  })

  describe('calculateTax', () => {
    test('calculates tax', () => {
      productTest.type.tax = productTest.type.tax * 100
      expect(store.calculateTax(productTest)).toBe('0.75')
    })
  })

  describe('delete product', () => {
    test('product can be deleted', async () => {
      await store.delete(productTest.id)
      expect(store.products).not.toContain(productTest)
    })
  })
})
