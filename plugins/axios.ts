import { Context } from '@nuxt/types'

const IGNORE_PATHS = [
    '/login',
    '/refresh'
]

interface RefreshData {
    accessToken: string
}

export default function ({ $axios, store, redirect }: Context) {
    $axios.onRequest((config) => {
        const ignore = IGNORE_PATHS.includes(config.url!)
        const user = store.state.user.data
        if (user && !ignore) {
            config.headers.Authorization = `Bearer ${user.accessToken}`
        }
        return config
    })

    $axios.onError((error) => {
        let failRequest = error.config
        if (error.response?.status === 401 && !IGNORE_PATHS.includes(error.config.url!)) {
                return $axios.$post<RefreshData>('/refresh', {
                    refreshToken: store.state.user.data.refreshToken
                }).then((data) => {
                    store.commit('user/setAccessToken', data.accessToken)
                    failRequest.headers.Authorization = `Bearer ${data.accessToken}`
                    return $axios(failRequest)
                })
        }
        if (error.response?.status === 401 && error.config.url === '/refresh') {
            store.commit('user/logout')
            redirect('/')
            return Promise.reject(error)
        }
        return Promise.reject(error)
    })
}
