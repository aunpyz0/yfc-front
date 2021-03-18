export const state = () => ({
    isLogIn: false,
})


export const mutations = {
    setIsLogin(state: any, isLogIn: Boolean) {
        state.isLogIn = isLogIn
    },
    setUser(state: any, user: any) {
        state.user = user
    }
}
