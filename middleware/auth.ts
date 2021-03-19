import { Context } from '@nuxt/types'

export default function (context: Context) {
    if (context.route.path === '/' && context.store.state.user.user) {
        return context.redirect('/give')
    }
    if (context.route.path !== '/' && !context.store.state.user.user) {
        return context.redirect('/')
    }
}
