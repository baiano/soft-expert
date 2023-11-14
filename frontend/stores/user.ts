import {
  getAuth,
  // signInWithPopup,
  // GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // sendSignInLinkToEmail
  // sendPasswordResetEmail
  signOut
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
        const { $auth } = useNuxtApp()
        await createUserWithEmailAndPassword($auth, this.userToRegister.email, this.userToRegister.password)
      } catch (err) {
        useToast().add({ title: 'Error', description: err.message, color: 'red' })
      }
    },
    async loginUser (event: FormSubmitEvent<any>) {
      try {
        const { $auth } = useNuxtApp()
        await signInWithEmailAndPassword($auth, this.userLogin.email, this.userLogin.password)
      } catch (err) {
        useToast().add({ title: 'Error', description: err.message, color: 'red' })
      }
    },
    async recoverPassword (event: FormSubmitEvent<any>) {
      try {
        const { $auth } = useNuxtApp()
        await sendPasswordResetEmail($auth, this.userToResetPassword.email)
        useToast().add({ title: 'Success', description: 'Email sent' })
        this.forgotPasswordModalIsOpen = false
        event.target.reset()
      } catch (err) {
        useToast().add({ title: 'Error', description: err.message, color: 'red' })
      }
    },
    async logout () {
      try {
        await signOut($auth)
      } catch (err) {
        useToast().add({ title: 'Error', description: err.message, color: 'red' })
      }
    },
  },
  persist: {
    paths: ['token'],
  },
})
