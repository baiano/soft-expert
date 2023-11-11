import {
  getAuth,
  // signInWithPopup,
  // GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
  // sendSignInLinkToEmail
  // sendPasswordResetEmail
} from 'firebase/auth'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    registerModalIsOpen: false,
    forgotPasswordModalIsOpen: false,
    token: '',
    userLogin: {
      email: '',
      password: '',
    },
    userToRegister: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    userToResetPassword: {
      email: '',
    },
  }),
  getters: {
  },
  actions: {
    async createUser (event: FormSubmitEvent<any>) {
      try {
        await createUserWithEmailAndPassword(getAuth(), this.userToRegister.email, this.userToRegister.password)
      } catch (err) {
        useToast().add({ title: 'Error', description: err.message, status: 'error' })
      }
    },
    async loginUser (event: FormSubmitEvent<any>) {
      try {
        await signInWithEmailAndPassword(getAuth(), this.userLogin.email, this.userLogin.password)
      } catch (err) {
        useToast().add({ title: 'Error', description: err.message, status: 'error' })
      }
    },
    async recoverPassword (event: FormSubmitEvent<any>) {
      try {
        await sendPasswordResetEmail(getAuth(), this.userToResetPassword.email)
        useToast().add({ title: 'Success', description: 'Email sent', status: 'success' })
        this.forgotPasswordModalIsOpen = false
        event.target.reset()
      } catch (err) {
        useToast().add({ title: 'Error', description: err.message, status: 'error' })
      }
    },
  },
})
