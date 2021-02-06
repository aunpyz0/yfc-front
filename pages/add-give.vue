<template>
  <v-row>
    <v-col cols="2">
      <v-sheet rounded="lg">
        <v-list color="transparent">
          <v-list-item v-for="(link, index) in links" :key="index" link :to="link.target">
            <v-list-item-content>
              <v-list-item-title> {{ link.name }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet min-height="70vh" rounded="lg">
        <!--  -->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'รายการทั้งหมด',
          target: '/'
        },
        {
          name: 'เพิ่มใหม่',
          target: '/add-give'
        },
      ],
    }
  },
}
</script>
