<template>
  <v-row>
    <v-col md="4" offset-md="4" class="mt-2">
      <v-sheet rounded="lg" class="pa-3">
        <v-form>
          <v-container>
                <v-select
                  label="ผู้ถวาย"
                  :items="supporters"
                  item-text="firstname"
                  item-value="code"
                  outlined
                  dense
                ></v-select>
                <v-text-field
                  label="จำนวนเงิน (บาท)"
                  outlined
                  dense
                ></v-text-field>
                <v-select
                  label="ช่องทาง"
                  :items="payment_types"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                ></v-select>
                <v-select
                  label="ประเภท"
                  :items="give_types"
                  item-text="name"
                  item-value="id"
                  v-model="form.give_type"
                  outlined
                  dense
                ></v-select>
                <v-row>
                  <v-col>
                    <v-menu
                      ref="giveFrom"
                      v-model="isShowGiveFromPicker"
                      :close-on-content-click="false"
                      :return-value.sync="form.give_from"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.give_from"
                          label="จากเดือน"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.give_from"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="isShowGiveFromPicker = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.giveFrom.save(form.give_from)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-menu
                      ref="giveTo"
                      v-model="isShowGiveToPicker"
                      :close-on-content-click="false"
                      :return-value.sync="form.to"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.give_to"
                          label="ถึงเดือน"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.give_to"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="isShowGiveToPicker = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.giveTo.save(form.to)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-select
                  label="แผนก"
                  :items="departments"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                ></v-select>
                <v-select
                  label="ผู้ติดตาม"
                  :items="staffs"
                  item-text="firstname"
                  item-value="code"
                  outlined
                  dense
                ></v-select>
                <div class="d-flex justify-end">
                  <v-btn color="secondary" class="mr-3" to="/give">ยกเลิก</v-btn>
                  <v-btn color="primary">บันทึก</v-btn>
                </div>
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
      isShowGiveFromPicker: false,
      isShowGiveToPicker: false,
      form: {
        give_from: new Date().toISOString().substr(0, 7),
        give_to: new Date().toISOString().substr(0, 7),
      },
      staffs: [],
      supporters: [],
      banks: [],
      give_types: [{
        id: 1,
        name: 'ถวายเพื่อเดือน'
      }, {
        id: 2,
        name: 'ของขวัญ'
      }, {
        id: 3,
        name: 'ค่าย YC 2021'
      }],
      departments: [{
        id: 1, name: 'OA'
      }, {
        id: 2, name: 'CNX'
      }],
      payment_types: [{
        id: 1, name: 'โอนเงิน'
      }, {
        id: 2, name: 'เงินสด'
      },{
        id: 3, name: 'เช็ค'
      }]
    }
  },
}
</script>
