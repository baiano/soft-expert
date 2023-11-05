export const useTypesStore = defineStore('typesStore', {
  state: () => ({
    types: [
      {
        id: 1,
        type: 'Type 1',
        tax: 0.1,
      },
      {
        id: 2,
        type: 'Type 2',
        tax: 0.2,
      },
      {
        id: 3,
        type: 'Type 3',
        tax: 0.3,
      },
      {
        id: 4,
        type: 'Type 4',
        tax: 0.4,
      },
      {
        id: 5,
        type: 'Type 5',
        tax: 0.5,
      },
      {
        id: 6,
        type: 'Type 6',
        tax: 0.6,
      }
    ],
  }),
  getters: {
    getTypeNames (state) {
      return state.types.map(type => type.type)
    },
  },
  actions: {
  },
})
