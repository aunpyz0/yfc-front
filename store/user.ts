export const state = () => ({
    isLogIn: false,
})


export const mutations = {
    setLogin(state: any, isLogin: Boolean) {
        state.isLogin = isLogin
    },
    setUser(state: any, user: any) {
        state.user = user
    }
}
