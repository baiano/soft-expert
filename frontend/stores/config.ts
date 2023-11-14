export const useConfigStore = defineStore('configStore', {
  state: () => ({
    isNavbarVisible: false,
    page: 1,
    rowsPerPage: 5,
    searchTerm: '',
  }),
  getters: {
    // apiUrl: () => 'http://localhost:8080/api',
    apiUrl: () => window.location.origin.split(':')[0] + ':' + window.location.origin.split(':')[1] + ':8080' + '/api',
  },
  actions: {
  },
})
