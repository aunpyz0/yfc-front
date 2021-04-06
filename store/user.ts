interface User {
    role?: string,
    refreshToken?: string,
    accessToken?: string,
    firstname?: string,
    lastname?: string,
}

export const state = () => ({
    data: null,
})

export const mutations = {
    setUser(state: any, user: User) {
        state.data = { ...user }
    },
    logout(state: any) {
        state.data = null
    },
    setAccessToken(state: any, accessToken: string) {
        state.data = {
            ...state.data,
            accessToken
        }
    }
}
