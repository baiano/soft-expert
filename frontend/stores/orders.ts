export const useOrdersStore = defineStore('ordersStore', {
  state: () => ({
    orders: [],
    columns: [{
      key: 'id',
      label: 'ID',
    },
    {
      key: 'quantity',
      label: 'Qty',
    },
    {
      key: 'value',
      label: 'Value',
    },
    {
      key: 'tax',
      label: 'Tax',
    },
    {
      key: 'total',
      label: 'Total',
    },
    {
      key: 'created_at',
      label: 'Created At',
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      class: 'text-right',
    }],
    newOrderColumns: [{
      key: 'id',
      label: 'ID',
    },
    {
      key: 'product',
      label: 'Product',
    },
    {
      key: 'quantity',
      label: 'Qty',
    },
    {
      key: 'price',
      label: 'Price un.',
    },
    {
      key: 'value',
      label: 'Value',
    },
    {
      key: 'tax',
      label: 'Tax',
    },
    {
      key: 'total',
      label: 'Total',
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      class: 'text-right',
    }],
    newOrder: {
      products: [],
    },
  }),
  getters: {
    getOrdersFiltered (state) {
      if (typeof state.orders?.filter !== 'function') { return [] }
      const configStore = useConfigStore()
      // filter orders that contains products
      return state.orders?.filter(order => order.products?.some((row) => {
        return row
      })).slice((configStore.page - 1) * configStore.rowsPerPage, configStore.page * configStore.rowsPerPage)
    },
    getItemsCount (state): number {
      if (typeof state.orders?.filter !== 'function') { return 0 }
      return state.orders?.filter(order => order.products?.some((row) => {
        return row
      })).length
    },

  },
  actions: {
    tableActions () {
      return [
        [{
          label: 'Cancel item',
          icon: 'i-heroicons-x-circle-20-solid',
          click: (row) => {
            const index = this.newOrder.products.indexOf(row)
            this.newOrder.products.splice(index, 1)
          },
        }]
      ]
    },
    async saveOrder (testing = false) {
      const order = await useCustomFetch(useConfigStore().apiUrl + '/orders', {
        method: 'POST',
        body: JSON.stringify(this.newOrder),
      })
      // this.orders.push(order)
      if (testing) {
        return order
      }

      this.newOrder = {
        products: [],
      }
      useToast().add({ title: 'Success', description: 'Order created' })
      useRouter().push('/orders')
    },
    productsQuantity (products) {
      // calculate considering quantity
      let acc = 0
      products.forEach((product) => {
        acc += parseInt(product.quantity)
      })
      return acc
    },
    calculateOrderTotal (order) {
      // calculate considering price * quantity + tax * quantity
      let acc = 0
      order.products.forEach((product) => {
        if (product.product.type) {
          acc += parseInt(product.quantity) * (parseFloat(product.product.price) + parseFloat(product.product.type.tax * product.product.price))
        }
      })
      return acc
    },
    calculateOrderTax (order) {
      // calculate considering tax * quantity
      let acc = 0
      order.products.forEach((product) => {
        if (product.product.type) {
          acc += parseInt(product.quantity) * parseFloat(product.product.type.tax * product.product.price)
        }
        // acc += parseInt(product.quantity) * parseFloat(product.product.type.tax * product.product.price)
      })
      return acc
    },
    calculateOrderValue (order) {
      // calculate considering price * quantity
      let acc = 0
      order.products.forEach((product) => {
        acc += parseInt(product.quantity) * parseFloat(product.product.price)
      })
      return acc
    },
    async fetchOrders () {
      const orders = await useCustomFetch(useConfigStore().apiUrl + '/orders')
      this.orders = orders.value
    },
    async getOrder (id) {
      const order = await useCustomFetch(useConfigStore().apiUrl + '/order/' + id)
      return order.value
    },
    async delete (id) {
      const isDeleted = await useCustomFetch(useConfigStore().apiUrl + '/order/' + id, {
        method: 'DELETE',
      })
      const index = this.orders.findIndex(order => order.id === id)
      this.orders.splice(index, 1)
      return isDeleted
    },
  },
  persist: {
    // paths: ['orders'],
  },
})
