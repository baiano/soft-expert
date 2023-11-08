export const useTypesStore = defineStore('typesStore', {
  state: () => ({
    types: [
      {
        id: 1,
        type: 'Groceries',
        tax: 0.1,
      },
      {
        id: 2,
        type: 'Eletronics',
        tax: 0.2,
      },
      {
        id: 3,
        type: 'Books',
        tax: 0.05,
      },
      {
        id: 4,
        type: 'Clothing',
        tax: 0.15,
      },
      {
        id: 5,
        type: 'Alcohol',
        tax: 0.3,
      },
      {
        id: 6,
        type: 'Other',
        tax: 0.1,
      }
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
      const configStore = useConfigStore()
      return state.types.filter(type => type.type.toLowerCase().includes(configStore.searchTerm.toLowerCase()))
    },
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
  persist: {
    paths: ['types'],
  },
})
