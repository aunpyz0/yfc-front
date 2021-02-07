<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-btn v-for="link in links" :key="link.path" text :to="link.path">
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
  computed: {
    sublinks() {
      const link = this.links.find(link => this.$route.path.startsWith(link.path))
      return link.links
    }
  },
  data: () => ({
    links: [{
      name: 'เงินถวาย',
      path: '/give',
    }, {
      name: 'สตาฟ',
      path: '/staff',
    }, {
      name: 'ผู้ถวาย',
      path: '/supporter',
    }, {
      name: 'ข้อมูลพื้นฐาน',
      path: '/master',
    }],
  }),
}
</script>

