<template>
    <v-app>
        <v-app-bar app color="white" flat>
            <v-container class="py-0 fill-height">
                <v-btn
                    v-for="link in links"
                    :key="link.path"
                    text
                    :to="link.path"
                    color="primary"
                >
                    {{ link.name }}
                </v-btn>
            </v-container>
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
    data: () => ({
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
    }),
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
