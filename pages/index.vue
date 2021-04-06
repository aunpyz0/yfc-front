<template>
    <v-container>
        <v-row justify="center">
            <v-col md="4">
                <v-alert type="error" v-if="error !== ''">{{ error }}</v-alert>
                <form @submit.prevent="login">
                    <v-text-field
                        v-model.trim="form.email"
                        label="Username"
                        outlined
                        dense
                        autofocus
                        @change="clear"
                    ></v-text-field>
                    <v-text-field
                        v-model.trim="form.password"
                        label="Password"
                        type="password"
                        outlined
                        dense
                        @change="clear"
                    ></v-text-field>
                    <v-btn type="submit" color="primary">Login</v-btn>
                </form>
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
            error: '',
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
                this.error = 'บัญชีผู้ใช้งาน หรือรหัสผิด'
            }
        },
        clear() {
            this.error = ''
        }
    },
}
</script>

<style></style>
