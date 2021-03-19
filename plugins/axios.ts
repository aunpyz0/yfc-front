import { Context } from '@nuxt/types'

export default function ({ $axios, store }: Context) {
    $axios.onRequest((config) => {
        const user = store.state.user.user
        if (user) {
            config.headers['Authorization'] = `Bearer ${user.accessToken}`
        }
    })
}
