export default defineNuxtRouteMiddleware(() => {
  try {
    const router = useRouter()
    const store = useConfigStore()
    router.afterEach(() => {
      store.isNavbarVisible = false
    })
  } catch (err) {
    console.log(err)
  }
})
