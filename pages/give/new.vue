<template>
    <v-row>
        <v-col md="4" offset-md="4" class="mt-2">
            <v-sheet rounded="lg" class="pa-3">
                <v-snackbar
                    v-model="alert.isShow"
                    timeout="3000"
                    transition="scroll-y-reverse-transition"
                    centered
                    top
                    :color="alert.color"
                >
                    {{ alert.message }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                            color="white"
                            text
                            v-bind="attrs"
                            @click="closeAlert()"
                        >
                        ปิด
                        </v-btn>
                    </template>
                </v-snackbar>
                <v-form>
                    <v-container>
                        <v-select
                            v-model="form.supporterId"
                            label="ผู้ถวาย"
                            :items="supportersWithFullname"
                            item-text="fullName"
                            item-value="id"
                            outlined
                            dense
                        ></v-select>
                        <v-text-field
                            v-model.number="form.amount"
                            label="จำนวนเงิน (บาท)"
                            outlined
                            dense
                        ></v-text-field>
                        <v-select
                            v-model="form.paymentTypeId"
                            label="ช่องทางการจ่ายเงิน"
                            :items="paymentTypes"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                        ></v-select>
                        <!-- Begin Bank Transfer -->
                        <v-row v-show="form.paymentTypeId === 1">
                            <v-col >
                                <v-menu
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
                                    v-model="form.bankFrom"
                                    label="โอนจากธนาคาร"
                                    :items="banks"
                                    item-text="name"
                                    item-value="id"
                                    outlined
                                    dense
                                ></v-select>
                                <v-select
                                    v-model="form.bankTo"
                                    label="โอนเข้าธนาคาร"
                                    :items="banks"
                                    item-text="name"
                                    item-value="id"
                                    outlined
                                    dense
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- End Bank Transfer -->
                        <!-- Begin Cheque -->
                        <v-row v-show="form.paymentTypeId === 3">
                            <v-col>
                                <v-select
                                    v-model="form.giveTypeId"
                                    label="ธนาคาร"
                                    :items="banks"
                                    item-text="name"
                                    item-value="id"
                                    outlined
                                    dense
                                ></v-select>
                                <v-text-field
                                    v-model="form.chequeBankBranch"
                                    label="สาขา"
                                    outlined
                                    dense
                                ></v-text-field>
                                <v-text-field
                                    v-model="form.chequeNumber"
                                    label="เลขที่เช็ค"
                                    outlined
                                    dense
                                ></v-text-field>
                                 <v-menu
                                    ref="chequeDate"
                                    v-model="isShowChequeDatePicker"
                                    :close-on-content-click="false"
                                    :return-value.sync="form.chequeDate"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template #activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="form.chequeDate"
                                            label="วันที่เช็ค"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="form.chequeDate"
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
                                                $refs.chequeDate.save(
                                                    form.chequeDate
                                                )
                                            "
                                        >
                                            ตกลง
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <!-- End Cheque -->
                        <v-select
                            v-model="form.giveTypeId"
                            label="ประเภทการถวาย"
                            :items="giveTypes"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                        ></v-select>
                        <v-row v-show="form.giveTypeId === 1">
                            <v-col>
                                <v-menu
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
                            </v-col>
                        </v-row>
                        <v-select
                            v-model="form.departmentId"
                            label="แผนก"
                            :items="departments"
                            item-text="name"
                            item-value="id"
                            outlined
                            dense
                        ></v-select>
                        <v-select
                            v-model="form.ownerId"
                            label="ผู้ติดตาม"
                            :items="staffsWithFullname"
                            item-text="fullName"
                            item-value="id"
                            outlined
                            dense
                        ></v-select>
                        <div class="d-flex justify-end">
                            <v-btn color="secondary" class="mr-3" to="/give"
                                >ยกเลิก</v-btn
                            >
                            <v-btn color="primary" @click.prevent="save">บันทึก</v-btn>
                        </div>
                    </v-container>
                </v-form>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import { parseISO, set } from 'date-fns'

export default {
    computed: {
        staffsWithFullname() {
            return this.staffs.map(fullname)
        },
        supportersWithFullname() {
            return this.supporters.map(fullname)
        }
    },
    data() {
        return {
            isShowTransferDatePicker: false,
            isShowTransferTimePicker: false,
            isShowGiveFromPicker: false,
            isShowGiveToPicker: false,
            isShowChequeDatePicker: false,
            form: {
                paymentTypeId: 1,
                giveTypeId: 1,
            },
            alert: {
                isShow: false
            },
            staffs: [],
            supporters: [],
            banks: [],
            giveTypes: [],
            departments: [],
            paymentTypes: [],
        }
    },
    methods: {
        save() {
            const give = {
                supporterId: this.form.supporterId,
                amount: this.form.amount,
                paymentTypeId: this.form.paymentTypeId,
                giveTypeId: this.form.giveTypeId,
                ownerId: this.form.ownerId,
                departmentId: this.form.departmentId
            }

            if (give.paymentTypeId === 1) { // bank transfer
                const [hours, minutes] = this.form.transferTime.split(':')
                give.transferDate = set(parseISO(this.form.transferDate), { hours, minutes })
                give.transferFromBankId = this.form.transferFromBankId
                give.transferToBankId = this.form.transferToBankId
            }
            if (give.paymentTypeId === 3) { // cheque
                give.chequeBankId = this.form.chequeBankId
                give.chequeBanBranch = this.form.chequeBankBranch
                give.chequeNumber = this.form.chequeNumber
                give.chequeDate = parseISO(this.form.chequeDate)
            }
            if (give.giveTypeId === 1) {
                give.giveFrom = parseISO(this.form.giveFrom)
                give.giveTo = parseISO(this.form.giveTo)
            }

            this.$axios.$post('/api/gives', give)
                .then(() => {
                    this.showSuccessAlert()
                })
                .catch(err => {
                    this.showFailAlert()
                })
        },
        showSuccessAlert() {
            this.alert.message = 'บันทึกสำเร็จแล้ว'
            this.alert.isShow = true
            this.alert.color = 'green'
        },
        showFailAlert() {
            this.alert.message = 'บันทึกไม่สำเร็จ'
            this.alert.isShow = true
            this.alert.color = 'red'
        },
        closeAlert() {
            this.alert.isShow = false
        }
    },
    async mounted() {
        const [
            staffs,
            supporters,
            paymentTypes,
            banks,
            giveTypes,
            departments,
        ] = await Promise.all([
            this.$axios.$get('/api/staffs'),
            this.$axios.$get('/api/supporters'),
            this.$axios.$get('/api/paymenttypes'),
            this.$axios.$get('/api/banks'),
            this.$axios.$get('/api/givetypes'),
            this.$axios.$get('/api/departments'),
        ])
        this.staffs = staffs
        this.supporters = supporters
        this.paymentTypes = paymentTypes
        this.banks = banks
        this.giveTypes = giveTypes
        this.departments = departments
    },
}

function fullname(person) {
    return {...person, fullName: `${person.firstname} ${person.lastname}`}
}

</script>
