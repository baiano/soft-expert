export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [
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
    newProduct: {
      product: '',
      types: [],
      price: 0,
    },
  }),
  getters: {
    getProductsPaginated (): {}[] {
      return this.products.slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
    },
    getProductsFiltered (state): {}[] {
      return this.products
        .filter((product) => {
        // product includes search term or types include search term
          return product.product.toLowerCase().includes(this.searchTerm.toLowerCase()) || product.types.some(type => type.type.toLowerCase().includes(this.searchTerm.toLowerCase()))
        })
        .slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
    },
    getItemsCount (): number {
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
    calculateTaxedPrice (price: number, types: [], quantity: number = 1) {
      let tax = 0
      const typesStore = useTypesStore()
      types[0].forEach((type) => {
        const typeObj = typesStore.types.find((t) => {
          console.log('t.id', t.id)
          return t.id === type.id
        })
        console.log('typeObj', typeObj)
        if (typeObj) {
          tax += typeObj.tax * price * quantity
        }
      }
      )
      return ((price * quantity) + tax).toFixed(2)
    },
    calculateTax (price: number, types: [], quantity: number = 1) {
      let tax = 0
      const typesStore = useTypesStore()
      types[0].forEach((type) => {
        const typeObj = typesStore.types.find((t) => {
          console.log('t.id', t.id)
          return t.id === type.id
        })
        console.log('typeObj', typeObj)
        if (typeObj) {
          tax += typeObj.tax * price * quantity
        }
      }
      )
      return tax.toFixed(2)
    },
    fakeProducts () {
      const products = []
      const types = useTypesStore().types
      for (let i = 0; i < 7; i++) {
        products.push({
          id: i,
          product: `Product ${i}`,
          types: [types[Math.floor(Math.random() * types.length)], types[Math.floor(Math.random() * types.length)]],
        })
      }
      this.products = products
    },
  },
})
