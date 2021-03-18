import { Context } from '@nuxt/types'
import VuexPersistence from 'vuex-persist'

declare global {
    interface Window {
        onNuxtReady: Function
    }
}

export default function(context: Context) {
    window.onNuxtReady(() => {
        new VuexPersistence({
            key: 'yfc'
        }).plugin(context.store)
    })
}
