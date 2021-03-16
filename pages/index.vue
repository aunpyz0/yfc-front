<template>
    <v-container>
        <v-row justify="center">
            <v-col md="4">
                <v-text-field
                    v-model.trim="form.username"
                    label="ีUsername"
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
                <v-btn color="primary">Login</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    layout: 'plain',
    data() {
        return {
            form: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        async login() {
            try {
                const response = await this.$axios.$post('/login', {
                    username: this.form.username,
                    password: this.form.password
                })
                if (response.status === 200) {
                    this.$store.commit('setIsLogin', true)
                    this.$store.commit('setUser', { ...response.data })
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<style>

</style>
