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
    data: () => {
        return {
            links: [
                {
                    name: 'เงินถวาย',
                    path: '/',
                },
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
                },
            ],
        }
    },
    computed: {
        sublinks() {
            const link = this.links.find((link) =>
                this.$route.path.startsWith(link.path)
            )
            return link.links
        },
    },
}
</script>

<style>
.v-application {
    font-family: 'Kanit', sans-serif;
}
</style>
