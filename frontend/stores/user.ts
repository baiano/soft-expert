export const useUserStore = defineStore('userStore', {
  state: () => ({
    registerModalIsOpen: false,
    userLogin: {
      email: '',
      password: '',
    },
    userToRegister: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  }),
  getters: {
  },
  actions: {
    async createUser (event: FormSubmitEvent<any>) {
      await console.log('create user')
    },
    async loginUser (event: FormSubmitEvent<any>) {
      await console.log('login user')
    },
  },
})
