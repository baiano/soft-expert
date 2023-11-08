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
      const configStore = useConfigStore()
      // filter if order.product.product contains configStore.searchTerm
      return state.orders.filter(order => order.products?.some((row) => {
        return row.product.product?.toLowerCase().includes(configStore.searchTerm.toLowerCase())
      }

      ))
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
    async saveOrder () {
      await $fetch(useConfigStore().apiUrl + '/orders', {
        method: 'POST',
        body: JSON.stringify(this.newOrder),
      })
      // this.orders.push(order)
      this.newOrder = {
        products: [],
      }
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
        acc += parseInt(product.quantity) * (parseFloat(product.product.price) + parseFloat(product.product.type.tax * product.product.price))
      })
      return acc
    },
    calculateOrderTax (order) {
      // calculate considering tax * quantity
      let acc = 0
      order.products.forEach((product) => {
        acc += parseInt(product.quantity) * parseFloat(product.product.type.tax * product.product.price)
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
      const orders = await $fetch(useConfigStore().apiUrl + '/orders')
      this.orders = orders
    },
    async getOrder (id) {
      const order = await $fetch(useConfigStore().apiUrl + '/order/' + id)
      return order
    },
  },
  persist: {
    paths: ['orders'],
  },
})
