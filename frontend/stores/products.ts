export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [
      {
        id: 1,
        product: 'Crispy Fried Onions',
        type: useTypesStore().types[0],
        price: 3.47,
      },
      {
        id: 2,
        product: 'Milk',
        type: useTypesStore().types[0],
        price: 1.99,
      },
      {
        id: 3,
        product: 'Beer',
        type: useTypesStore().types[4],
        price: 2.49,
      },
      {
        id: 4,
        product: 'Rock T-Shirt',
        type: useTypesStore().types[3],
        price: 12.99,
      },
      {
        id: 5,
        product: 'Bananas',
        type: useTypesStore().types[0],
        price: 1.49,
      },
      {
        id: 6,
        product: 'Magic beans',
        type: useTypesStore().types[5],
        price: 5.99,
      },
      {
        id: 7,
        product: 'Potatoes',
        type: useTypesStore().types[0],
        price: 2.79,
      },
    ],
    columns: [{
      key: 'id',
      label: 'ID',
    }, {
      key: 'product',
      label: 'Product',
      sortable: true,
    }, {
      key: 'type',
      label: 'Type',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
    },
    {
      key: 'tax',
      label: 'Tax',
      sortable: true,
    },
    {
      key: 'total',
      label: 'Total Price',
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
      type: {
        
      },
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
    calculateTaxedPrice (product) {
      if (!product) return 0.00
      let tax = 0
      tax += product.type?.tax * product.price * product.quantity
      if (!product?.price){
        tax = 0
      }
      return ((product.price * product.quantity) + tax).toFixed(2)
    },
    calculateTax (product) {
      let tax = 0
      console.log('product', product)
      tax += product.type?.tax * product.price * product.quantity
      if (!product?.price){
        tax = 0
      }
      return tax.toFixed(2)
    },
    fakeProducts () {
      const products = []
      const types = useTypesStore().types
      for (let i = 0; i < 7; i++) {
        products.push({
          id: i,
          product: `Product ${i}`,
          type: { type: types[Math.floor(Math.random() * types.length)].type, tax: types[Math.floor(Math.random() * types.length)].tax },
          price: Math.floor(Math.random() * 100),
        })
      }
      this.products = products
    },
  },
})
