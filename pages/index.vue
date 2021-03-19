<template>
    <v-container>
        <v-row justify="center">
            <v-col md="4">
                <v-text-field
                    v-model.trim="form.email"
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
    middleware: ['auth'],
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        async login() {
            try {
                const user = await this.$axios.$post('/login', {
                    email: this.form.email,
                    password: this.form.password,
                })
                this.$store.commit('user/setUser', user)
                this.$router.push('/give')
            } catch (err) {
                console.error(err)
            }
        },
    },
}
</script>

<style></style>
