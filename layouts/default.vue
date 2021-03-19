<template>
    <v-app>
        <v-app-bar app color="white" flat>
            <v-tabs centered>
                <v-tab
                    v-for="link in links"
                    :key="link.path"
                    :to="link.path"
                    text
                    color="primary"
                    nuxt
                >
                    {{ link.name }}
                </v-tab>
            </v-tabs>
            <v-btn v-if="isLogIn" @click="logout()">logout</v-btn>
        </v-app-bar>
        <v-main class="grey lighten-3">
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    middleware: ['auth'],
    computed: {
        sublinks() {
            const link = this.links.find((link) =>
                this.$route.path.startsWith(link.path)
            )
            return link.links
        },
        isLogIn() {
            return !!this.$store.state.user.user
        },
        user() {
            return this.$store.state.user.user
        },
        links() {
            const links = [
                {
                    name: 'เงินถวาย',
                    path: '/give',
                },
            ]
            if (this.user && this.user.role === 'ACCOUNTANT') {
                links.push(
                    {
                        name: 'สตาฟ',
                        path: '/staff',
                    },
                    {
                        name: 'ผู้ถวาย',
                        path: '/supporter',
                    },
                    {
                        name: 'ข้อมูลพื้นฐาน',
                        path: '/master/givetype',
                    }
                )
            }
            return links
        },
    },
    methods: {
        logout() {
            this.$store
                .dispatch('user/logout')
                .then(() => this.$router.push('/'))
        },
    },
}
</script>

<style>
.v-application {
    font-family: 'Kanit', sans-serif;
}
</style>
