export const useOrdersStore = defineStore('ordersStore', {
  state: () => ({
    orders: [],
    columns: [{
      key: 'id',
      label: 'ID',
    },
    {
      key: 'product',
      label: 'Product',
    },
    {
      key: 'type',
      label: 'Type',
    },
    {
      key: 'quantity',
      label: 'Qty',
    },
    {
      key: 'price',
      label: 'Price',
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

  },
  actions: {
    tableActions (row) {
      return [
         [{
          label: 'Cancel item',
          icon: 'i-heroicons-x-circle-20-solid',
        }]
      ]
    },
  },
})
