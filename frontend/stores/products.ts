export const useProductsStore = defineStore('productsStore', {
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
    newProduct: {
      product: '',
      type: {

      },
      price: 0,
    },
  }),
  getters: {
    getProductsPaginated (state): {}[] {
      const configStore = useConfigStore()
      return state.products.slice((configStore.page - 1) * configStore.rowsPerPage, configStore.page * configStore.rowsPerPage)
    },
    getProductsFiltered (state): {}[] {
      const configStore = useConfigStore()
      if (typeof state.products?.filter !== 'function') { return [] }
      return state.products?.filter((product) => {
        // product includes search term or types include search term
        return product.product?.toLowerCase().includes(configStore.searchTerm.toLowerCase()) || product.types?.some(type => type.type.toLowerCase().includes(configStore.searchTerm.toLowerCase()))
      })
        .slice((configStore.page - 1) * configStore.rowsPerPage, configStore.page * configStore.rowsPerPage)
    },
    getItemsCount (state): number {
      const configStore = useConfigStore()

      if (configStore.searchTerm !== '') {
        return state.products?.filter(product => product.product.toLowerCase().includes(configStore.searchTerm.toLowerCase())).length
      }
      return state.products?.length
    },
    getProductFromUrl (state) {
      const id = parseInt(useRoute().params.id)
      const product = state.products.find(product => product.id === id)
      return product
    },
  },
  actions: {
    tableActions (row) {
      return [
        [{
          label: 'Edit',
          icon: 'i-heroicons-pencil-square-20-solid',
          click: () => useRouter().push('/product/edit/' + row.id),
        }], [{
          label: 'Delete',
          icon: 'i-heroicons-trash-20-solid',
          click: () => this.delete(row.id),
        }]
      ]
    },
    calculateTaxedPrice (product) {
      if (!product) { return 0.00 }
      let tax = 0
      tax += ((product.type?.tax) * product.price) * product.quantity
      if (!product?.price) {
        tax = 0
      }
      return ((product.price * product.quantity) + tax).toFixed(2)
    },
    calculateTax (product) {
      let tax = 0
      tax += ((product.type?.tax) * product.price) * (product.quantity ?? 1)
      if (!product?.price) {
        tax = 0
      }
      return tax.toFixed(2)
    },
    async fetchProducts () {
      const products = await useCustomFetch(useConfigStore().apiUrl + '/products')
      this.products = products.value
    },
    async saveProduct (testing = false) {
      const product = await useCustomFetch(useConfigStore().apiUrl + '/products', {
        method: 'POST',
        body: JSON.stringify(this.newProduct),
      })
      if (testing) {
        return product
      }
      this.products.push(product)
      this.resetNewUser()
      useToast().add({ title: 'Success', description: 'Product created' })
      useRouter().push('/products')
    },
    async delete (id) {
      const isDeleted = await useCustomFetch(useConfigStore().apiUrl + '/product/' + id, {
        method: 'DELETE',
      })
      const index = this.products.findIndex(product => product.id === id)
      this.products.splice(index, 1)
      useToast().add({ title: 'Success', description: 'Product deleted' })
      return isDeleted
    },
    async updateProduct (productToUpdate, testing = false) {
      const productUpdated = await useCustomFetch(useConfigStore().apiUrl + '/product/' + productToUpdate.id, {
        method: 'PUT',
        body: JSON.stringify(!testing ? this.getProductFromUrl : productToUpdate),
      })
      // const index = this.products.findIndex(product => product.id === productUpdated.value.id)
      this.products.find(product => product.id === productUpdated.value.id).product = productUpdated.value.product
      if (testing) {
        this.products[index].type = productToUpdate.type
        return product
      }
      this.resetNewUser()
      useToast().add({ title: 'Success', description: 'Product updated' })
      useRouter().push('/products')
    },
    resetNewUser () {
      this.newProduct = {
        product: '',
        type: {

        },
        price: 0,
      }
    },
  },
  persist: {
    // paths: ['products'],
  },
})
