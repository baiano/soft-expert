export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [{
      id: 1,
      product: 'Product 1',
      types: ['Type 1', 'Type 6'],
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
    },
    {
      id: 7,
      product: 'Product 66',
      types: ['Type 6', 'Type 1'],
    },
    {
      id: 8,
      product: 'Product 666',
      types: ['Type 6', 'Type 6'],
    },
    {
      id: 9,
      product: 'Product 6666',
      types: ['Type 6', 'Type 5'],
    },
    {
      id: 10,
      product: 'Product 66666',
      types: ['Type 6', 'Type 4'],
    },
    {
      id: 11,
      product: 'Product 666666',
      types: ['Type 6', 'Type 3'],
    }

    ],
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
    rowsPerPage: 5,
    searchTerm: '',
  }),
  getters: {
    getProductsPaginated () {
      return this.products.slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
    },
    getProductsFiltered () {
      return this.products
        .filter((product) => {
        // product includes search term or types include search term
          return product.product.toLowerCase().includes(this.searchTerm.toLowerCase()) || product.types.some(type => type.toLowerCase().includes(this.searchTerm.toLowerCase()))
        })
        .slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
    },
    getItemsCount () {
      if (this.searchTerm !== '') {
        return this.products.filter(product => product.product.toLowerCase().includes(this.searchTerm.toLowerCase())).length
      }
      return this.products.length
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
