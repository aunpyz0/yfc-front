import { Context } from "@nuxt/types";

const skipRoutes = [
    '/',
]

export default function(context: Context) {
    if (!skipRoutes.includes(context.route.path) && !context.store.state.isLogIn) {
        return context.redirect('/')
    }
}
