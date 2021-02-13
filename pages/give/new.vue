<template>
    <v-row>
        <v-col md="4" offset-md="4" class="mt-2">
            <v-sheet rounded="lg" class="pa-3">
                <v-form>
                    <v-container>
                        <v-select
                            label="ผู้ถวาย"
                            :items="supporters"
                            item-text="fullName"
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
                            v-model="form.paymentType"
                            label="ช่องทางการจ่ายเงิน"
                            :items="paymentTypes"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                        ></v-select>
                        <v-menu
                            v-if="form.paymentType === 1"
                            ref="transferDate"
                            v-model="isShowTransferDatePicker"
                            :close-on-content-click="false"
                            :return-value.sync="form.transferDate"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template #activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.transferDate"
                                    label="วันที่โอน"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.transferDate"
                                type="date"
                                no-title
                                scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="isShowTransferDatePicker = false"
                                >
                                    ยกเลิก
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="
                                        $refs.transferDate.save(
                                            form.transferDate
                                        )
                                    "
                                >
                                    ตกลง
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-menu
                            v-if="form.paymentType === 1"
                            ref="transferTime"
                            v-model="isShowTransferTimePicker"
                            :close-on-content-click="false"
                            :return-value.sync="form.transferTime"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template #activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.transferTime"
                                    label="เวลาที่โอน"
                                    prepend-icon="mdi-clock-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-time-picker
                                v-model="form.transferTime"
                                format="24hr"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="isShowTransferTimePicker = false"
                                >
                                    ยกเลิก
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="
                                        $refs.transferTime.save(
                                            form.transferTime
                                        )
                                    "
                                >
                                    ตกลง
                                </v-btn>
                            </v-time-picker>
                        </v-menu>
                        <v-select
                            v-model="form.giveType"
                            label="ประเภทการถวาย"
                            :items="giveTypes"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                        ></v-select>
                        <v-menu
                            v-if="form.giveType === 1"
                            ref="giveFrom"
                            v-model="isShowGiveFromPicker"
                            :close-on-content-click="false"
                            :return-value.sync="form.giveFrom"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template #activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.giveFrom"
                                    label="จากเดือน"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.giveFrom"
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
                                    ยกเลิก
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.giveFrom.save(form.giveFrom)"
                                >
                                    ตกลง
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-menu
                            v-if="form.giveTo === 1"
                            ref="giveTo"
                            v-model="isShowGiveToPicker"
                            :close-on-content-click="false"
                            :return-value.sync="form.giveTo"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template #activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.giveTo"
                                    label="ถึงเดือน"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.giveTo"
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
                                    ยกเลิก
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.giveTo.save(form.giveTo)"
                                >
                                    ตกลง
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
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
                            item-text="fullName"
                            item-value="code"
                            outlined
                            dense
                        ></v-select>
                        <div class="d-flex justify-end">
                            <v-btn color="secondary" class="mr-3" to="/give"
                                >ยกเลิก</v-btn
                            >
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
    data() {
        return {
            isShowTransferDatePicker: false,
            isShowTransferTimePicker: false,
            isShowGiveFromPicker: false,
            isShowGiveToPicker: false,
            form: {
                paymentType: 1,
            },
            staffs: [
                {
                    id: 1,
                    code: 1,
                    firstName: 'ภีระวัฒน์',
                    lastName: 'พุ่มบัว',
                    fullName: 'ภีระวัฒน์ พุ่มบัว',
                },
            ],
            supporters: [
                {
                    id: 1,
                    code: 1,
                    firstName: 'ภีระวัฒน์',
                    lastName: 'พุ่มบัว',
                    fullName: 'ภีระวัฒน์ พุ่มบัว',
                },
            ],
            banks: [
                {
                    id: 1,
                    name: 'ไทยพานิชย์',
                },
            ],
            giveTypes: [
                {
                    id: 1,
                    name: 'ถวายเพื่อเดือน',
                },
                {
                    id: 2,
                    name: 'ของขวัญ',
                },
                {
                    id: 3,
                    name: 'ค่าย YC 2021',
                },
            ],
            departments: [
                {
                    id: 1,
                    name: 'OA',
                },
                {
                    id: 2,
                    name: 'CNX',
                },
            ],
            paymentTypes: [
                {
                    id: 1,
                    name: 'โอนเงิน',
                },
                {
                    id: 2,
                    name: 'เงินสด',
                },
                {
                    id: 3,
                    name: 'เช็ค',
                },
            ],
        }
    },
    async mounted() {
        // const [staffs, supporters] = await Promise.all([
        //     this.$axios.$get('/api/staffs'),
        //     this.$axios.$get('/api/supporters')
        // ])
        // this.staffs = staffs
        // this.supporters = supporters
    },
}
</script>
