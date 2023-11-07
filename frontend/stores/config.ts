export const useConfigStore = defineStore('configStore', {
  state: () => ({
    isNavbarVisible: false,
    page: 1,
    rowsPerPage: 5,
    searchTerm: '',
    apiUrl: 'http://localhost:8080/api',
  }),
  getters: {
  },
  actions: {
  },
})
