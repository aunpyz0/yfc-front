export const state = () => ({
    user: null,
})

export const mutations = {
    setUser(state: any, user: any) {
        state.user = user
    },
    logout(state: any) {
        state.user = null
    },
}

export const actions = {
    async logout(context: any) {
        try {
            await this.$axios.post('/logout')
        } catch (err) {
            console.error(err)
        } finally {
            context.commit('logout')
        }
    },
}
