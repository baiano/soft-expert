export const useConfigStore = defineStore('configStore', {
  state: () => ({
    isNavbarVisible: false,
    page: 1,
    rowsPerPage: 5,
    searchTerm: '',
    // apiUrl must use own location with /api after it
    apiUrl: window.location.origin.split(':')[0] + ':' + window.location.origin.split(':')[1] + ':8080' + '/api',
  }),
  getters: {
  },
  actions: {
  },
})
