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
      },
    ],
    newType: {
      type: '',
      tax: 0,
    },
  }),
  getters: {
    getTypeNames (state) {
      return state.types.map(type => type.type)
    },
  },
  actions: {
  },
})
