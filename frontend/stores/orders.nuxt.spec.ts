import { setup } from '@nuxt/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach
} from 'vitest'
import { useOrdersStore } from './orders'

beforeAll(() => {
  setActivePinia(createPinia())

  setup({
    server: false,
    configFile: 'nuxt.config.ts',
  })
})

describe('initializes', () => {
  test('works', () => {
    expect(true).toBe(true)
  })
})

describe('Orders Store', () => {
  let store
  let orderTest
  const fakeOrder = {
    products: [
      {
        product: {
          id: 3,
          product: 'Beer',
          id_type: 5,
          price: 2.49,
          type: {
            id: 5,
            type: 'Alcohol',
            tax: 0.3,
          },
        },
        quantity: '02',
        id: 1,
      },
      {
        product: {
          id: 2,
          product: 'Milk',
          id_type: 1,
          price: 1.99,
          type: {
            id: 1,
            type: 'Groceries',
            tax: 0.1,
          },
        },
        quantity: '02',
        id: 2,
      }
    ],
  }

  beforeEach(async () => {
    store = useOrdersStore()
    await store.fetchOrders()
  })

  describe('calculateOrderTotal', () => {
    test('calculate order total', () => {
      const total = store.calculateOrderTotal(fakeOrder)
      expect(parseFloat(total.toFixed(2))).toBe(10.85)
    })
  })

  describe('calculateOrderTax', () => {
    test('calculate order tax', () => {
      const tax = store.calculateOrderTax(fakeOrder)
      expect(parseFloat(tax.toFixed(2))).toBe(1.89)
    })
  })

  describe('calculateOrderValue', () => {
    test('calculate order value', () => {
      const value = store.calculateOrderValue(fakeOrder)
      expect(parseFloat(value.toFixed(2))).toBe(8.96)
    })
  })
})
