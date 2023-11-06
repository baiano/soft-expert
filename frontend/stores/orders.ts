export const useOrdersStore = defineStore('ordersStore', {
  state: () => ({
    orders: [],
    columns: [{
      key: 'id',
      label: 'ID',
    },
    {
      key: 'total',
      label: 'Total',
    },
    {
      key: 'qty',
      label: 'Qty',
    },
    {
      key: 'createdAt',
      label: 'Created At',
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
          label: 'Edit',
          icon: 'i-heroicons-pencil-square-20-solid',
          click: () => console.log('Edit', row.id),
        }], [{
          label: 'Delete',
          icon: 'i-heroicons-trash-20-solid',
        }]
      ]
    },
  },
})
