<template>
  <v-row>
    <v-col md="4" offset-md="4" class="mt-3">
      <v-sheet min-height="70vh" rounded="lg" class="pa-3">
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-select
                  label="ผู้ถวาย"
                  :items="supporters"
                  item-text="firstname"
                  item-value="code"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="จำนวนเงิน"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  label="ช่องทาง"
                  :items="payment_types"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  label="ประเภท"
                  :items="give_types"
                  item-text="name"
                  item-value="id"
                  v-model="form.give_type"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="form.give_type === 1">
              <v-col md="6">
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
              <v-col md="6">
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
            <v-row>
              <v-col>
                <v-select
                  label="แผนก"
                  :items="departments"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  label="ผู้ติดตาม"
                  :items="staffs"
                  item-text="firstname"
                  item-value="code"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  label="ผู้รับเงิน"
                  :items="staffs"
                  item-text="firstname"
                  item-value="code"
                ></v-select>
              </v-col>
            </v-row>
             <v-row>
              <v-col class="d-flex justify-end">
                <v-btn color="secondary" class="mr-3" to="/give">ยกเลิก</v-btn>
                <v-btn color="primary">บันทึก</v-btn>
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
