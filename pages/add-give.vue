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
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  label="ผู้ถวาย"
                  :items="supporters"
                  item-text="firstname"
                  item-value="code"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="จำนวนเงิน"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  label="ผู้ติดตาม"
                  :items="staffs"
                  item-text="firstname"
                  item-value="code"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  label="ผู้รับเงิน"
                  :items="staffs"
                  item-text="firstname"
                  item-value="code"
                ></v-select>
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async mounted() {
    const [staffs, supporters] = await Promise.all([
        this.$axios.$get('/api/staffs'),
        this.$axios.$get('/api/supporters')
    ])
    this.staffs = staffs
    this.supporters = supporters
  },
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
      staffs: [],
      supporters: [],
      banks: [],
    }
  },
}
</script>
