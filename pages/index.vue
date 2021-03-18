<template>
    <v-container>
        <v-row justify="center">
            <v-col md="4">
                <v-text-field
                    v-model.trim="form.username"
                    label="Username"
                    outlined
                    dense
                    autofocus
                ></v-text-field>
                <v-text-field
                    v-model.trim="form.password"
                    label="Password"
                    type="password"
                    outlined
                    dense
                ></v-text-field>
                <v-btn color="primary" @click.prevent="login">Login</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    layout: 'plain',
    middleware(context) {
        try {
            console.log(context.store.state.user)
            if (context.store.state.user.isLogIn) {
                context.redirect('/give')
            }
        } catch (err) {
            console.error(err)
        }
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        async login() {
            try {
                const user = await this.$axios.$post('/login', {
                    username: this.form.username,
                    password: this.form.password,
                })
                this.$store.commit('user/setIsLogin', true)
                this.$store.commit('user/setUser', user)
                this.redirect('/give')
            } catch (err) {
                console.error(err)
            }
        },
    },
}
</script>

<style></style>
