export const useTypesStore = defineStore('typesStore', {
  state: () => ({
    types: [
    ],
    columns: [{
      key: 'id',
      label: 'ID',
    }, {
      key: 'type',
      label: 'Type',
      sortable: true,
    }, {
      key: 'tax',
      label: 'Tax',
      sortable: true,
    }, {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      class: 'text-right',
    }],
    newType: {
      type: '',
      tax: 0,
    },
  }),
  getters: {
    getTypeNames (state) {
      return state.types.map(type => type.type)
    },
    getTypesFiltered (state) {
      if (typeof state.types.data.filter !== 'function') { return [] }
      const configStore = useConfigStore()
      return state.types?.data.filter(type => type.type?.toLowerCase().includes(configStore.searchTerm.toLowerCase()))
    },
    getTypeFromUrl (state) {
      const id = parseInt(useRoute().params.id)
      return state.types.find(type => type.id === id)
    },
  },
  actions: {
    tableActions (row) {
      return [
        [{
          label: 'Edit',
          icon: 'i-heroicons-pencil-square-20-solid',
          click: () => useRouter().push('/type/edit/' + row.id),
        }], [{
          label: 'Delete',
          icon: 'i-heroicons-trash-20-solid',
          click: () => this.delete(row.id),
        }]
      ]
    },
    async fetchTypes () {
      const types = await useCustomFetch(useConfigStore().apiUrl + '/types')
      this.types = types
    },
    async saveType () {
      const type = await useCustomFetch(useConfigStore().apiUrl + '/types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newType),
      })
      this.types.push(type)
      this.newType = {
        type: '',
        tax: 0,
      }
      useRouter().push('/types')
    },
    async delete (id) {
      await useCustomFetch(useConfigStore().apiUrl + '/type/' + id, {
        method: 'DELETE',
      })
      const index = this.types.findIndex(type => type.id === id)
      this.types.splice(index, 1)
    },
    async update (typeUpdated) {
      const type = await useCustomFetch(useConfigStore().apiUrl + '/type/' + typeUpdated.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeUpdated),
      })
      const index = this.types.findIndex(type => type.id === typeUpdated.id)
      this.types[index] = type
      this.newType = {
        type: '',
        tax: 0,
      }
      useRouter().push('/types')
    },
  },
  persist: {
    // paths: ['types'],
  },
})
