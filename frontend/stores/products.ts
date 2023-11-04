export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [{
      id: 1,
      product: 'Product 1',
      types: ['Type 1', 'Type 2'],
    },
    {
      id: 2,
      product: 'Product 2',
      types: ['Type 2', 'Type 3'],
    }, {
      id: 3,
      product: 'Product 3',
      types: ['Type 2', 'Type 4'],
    }, {
      id: 4,
      product: 'Product 4',
      types: ['Type 1', 'Type 4'],
    }, {
      id: 5,
      product: 'Product 5',
      types: ['Type 3', 'Type 2'],
    }, {
      id: 6,
      product: 'Product 6',
      types: ['Type 1', 'Type 2'],
    }],
    columns: [{
      key: 'id',
      label: 'ID',
    }, {
      key: 'product',
      label: 'Product',
      sortable: true,
    }, {
      key: 'types',
      label: 'Types',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      class: 'text-right',
    }],
    page: 1,
    pageCount: 5,
    searchTerm: '',
  }),
  getters: {
    getProductsPaginated () {
      return this.products.slice((this.page - 1) * this.pageCount, this.page * this.pageCount)
    },
    getProductsFiltered () {
      return this.getProductsPaginated.filter(product => product.product.toLowerCase().includes(this.searchTerm.toLowerCase()))
    },
  },
  actions: {
    tableActions (row) {
      return [
        [{
          label: 'Edit',
          icon: 'i-heroicons-pencil-square-20-solid',
          click: () => console.log('Edit', row.id),
        }, {
          label: 'Duplicate',
          icon: 'i-heroicons-document-duplicate-20-solid',
        }], [{
          label: 'Delete',
          icon: 'i-heroicons-trash-20-solid',
        }]
      ]
    },
  },
})
