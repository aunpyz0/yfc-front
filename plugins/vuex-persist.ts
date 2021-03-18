import { Context } from '@nuxt/types'
import VuexPersistence from 'vuex-persist'

export default function(context: Context) {
    new VuexPersistence({
        key: 'yfc'
    }).plugin(context.store)
}
