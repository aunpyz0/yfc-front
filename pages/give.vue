<template>
    <v-row>
        <v-col>
            <v-snackbar
                v-model="alert.isShow"
                timeout="3000"
                transition="scroll-y-reverse-transition"
                centered
                top
                :color="alert.color"
            >
                {{ alert.message }}
                <template #action="{ attrs }">
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
            <v-data-table
                :headers="headers"
                :items="giveItems"
                class="elevation-1"
            >
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>รายการถวายทั้งหมด</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template #activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon class="mr-2">
                                        mdi-plus
                                    </v-icon>
                                    เพิ่มข้อมูล
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span>{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form>
                                        <v-container>
                                            <v-select
                                                v-model="editedItem.supporterId"
                                                label="ผู้ถวาย"
                                                :items="supportersWithFullname"
                                                item-text="fullName"
                                                item-value="id"
                                                outlined
                                                dense
                                            ></v-select>
                                            <v-text-field
                                                v-model.number="
                                                    editedItem.amount
                                                "
                                                label="จำนวนเงิน (บาท)"
                                                outlined
                                                dense
                                            ></v-text-field>
                                            <v-select
                                                v-model="
                                                    editedItem.paymentTypeId
                                                "
                                                label="ช่องทางการจ่ายเงิน"
                                                :items="paymentTypes"
                                                item-text="name"
                                                item-value="id"
                                                outlined
                                                dense
                                            ></v-select>
                                            <!-- Begin Bank Transfer -->
                                            <v-row
                                                v-show="
                                                    editedItem.paymentTypeId ===
                                                    1
                                                "
                                                class="mt-0"
                                            >
                                                <v-col>
                                                    <v-menu
                                                        ref="transferDate"
                                                        v-model="
                                                            isShowTransferDatePicker
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        :return-value.sync="
                                                            editedItem.transferDate
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template
                                                            #activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.transferDate
                                                                "
                                                                label="วันที่โอน"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-bind="attrs"
                                                                dense
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                editedItem.transferDate
                                                            "
                                                            type="date"
                                                            no-title
                                                            scrollable
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    isShowTransferDatePicker = false
                                                                "
                                                            >
                                                                ยกเลิก
                                                            </v-btn>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    $refs.transferDate.save(
                                                                        editedItem.transferDate
                                                                    )
                                                                "
                                                            >
                                                                ตกลง
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                    <v-menu
                                                        ref="transferTime"
                                                        v-model="
                                                            isShowTransferTimePicker
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        :return-value.sync="
                                                            editedItem.transferTime
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template
                                                            #activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.transferTime
                                                                "
                                                                label="เวลาที่โอน"
                                                                prepend-icon="mdi-clock-outline"
                                                                readonly
                                                                v-bind="attrs"
                                                                dense
                                                                class="mb-4"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-time-picker
                                                            v-model="
                                                                editedItem.transferTime
                                                            "
                                                            format="24hr"
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    isShowTransferTimePicker = false
                                                                "
                                                            >
                                                                ยกเลิก
                                                            </v-btn>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    $refs.transferTime.save(
                                                                        editedItem.transferTime
                                                                    )
                                                                "
                                                            >
                                                                ตกลง
                                                            </v-btn>
                                                        </v-time-picker>
                                                    </v-menu>
                                                    <v-select
                                                        v-model="
                                                            editedItem.transferFromBankId
                                                        "
                                                        label="โอนจากธนาคาร"
                                                        :items="banks"
                                                        item-text="name"
                                                        item-value="id"
                                                        outlined
                                                        dense
                                                    ></v-select>
                                                    <v-select
                                                        v-model="
                                                            editedItem.transferToBankId
                                                        "
                                                        label="โอนเข้าธนาคาร"
                                                        :items="yfcBanks"
                                                        item-text="name"
                                                        item-value="id"
                                                        outlined
                                                        dense
                                                    ></v-select>
                                                    <v-file-input
                                                        accept="image/*"
                                                        v-model="
                                                            editedItem.evidence
                                                        "
                                                        label="หลักฐาน"
                                                        chips
                                                        dense
                                                        class="mb-4"
                                                        @change="preview"
                                                    ></v-file-input>
                                                    <v-img
                                                        v-show="editedItem.url"
                                                        max-width="300"
                                                        :src="editedItem.url"
                                                        class="mb-4 mx-auto"
                                                        alt="หลักฐานการถวาย"
                                                    ></v-img>
                                                </v-col>
                                            </v-row>
                                            <!-- End Bank Transfer -->
                                            <!-- Begin Cash -->
                                            <v-row
                                                v-show="
                                                    editedItem.paymentTypeId ===
                                                    2
                                                "
                                                class="mt-0"
                                            >
                                                <v-col>
                                                    <v-menu
                                                        ref="receiveDate"
                                                        v-model="
                                                            isShowReceiveDatePicker
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        :return-value.sync="
                                                            editedItem.receiveDate
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template
                                                            #activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.receiveDate
                                                                "
                                                                label="วันที่ส่งเงินให้เจ้าหน้าที่บัญชี"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-bind="attrs"
                                                                dense
                                                                class="mb-4"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                editedItem.receiveDate
                                                            "
                                                            type="date"
                                                            no-title
                                                            scrollable
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    isShowReceiveDatePicker = false
                                                                "
                                                            >
                                                                ยกเลิก
                                                            </v-btn>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    $refs.receiveDate.save(
                                                                        editedItem.receiveDate
                                                                    )
                                                                "
                                                            >
                                                                ตกลง
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <!-- End Cash -->
                                            <!-- Begin Cheque -->
                                            <v-row
                                                v-show="
                                                    editedItem.paymentTypeId ===
                                                    3
                                                "
                                                class="mt-0"
                                            >
                                                <v-col>
                                                    <v-select
                                                        v-model="
                                                            editedItem.giveTypeId
                                                        "
                                                        label="ธนาคาร"
                                                        :items="banks"
                                                        item-text="name"
                                                        item-value="id"
                                                        outlined
                                                        dense
                                                    ></v-select>
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.chequeBankBranch
                                                        "
                                                        label="สาขา"
                                                        outlined
                                                        dense
                                                    ></v-text-field>
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.chequeNumber
                                                        "
                                                        label="เลขที่เช็ค"
                                                        outlined
                                                        dense
                                                    ></v-text-field>
                                                    <v-menu
                                                        ref="chequeDate"
                                                        v-model="
                                                            isShowChequeDatePicker
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        :return-value.sync="
                                                            editedItem.chequeDate
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template
                                                            #activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.chequeDate
                                                                "
                                                                label="วันที่เช็ค"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-bind="attrs"
                                                                dense
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                editedItem.chequeDate
                                                            "
                                                            type="date"
                                                            no-title
                                                            scrollable
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    isShowTransferDatePicker = false
                                                                "
                                                            >
                                                                ยกเลิก
                                                            </v-btn>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    $refs.chequeDate.save(
                                                                        editedItem.chequeDate
                                                                    )
                                                                "
                                                            >
                                                                ตกลง
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                    <v-file-input
                                                        accept="image/*"
                                                        v-model="
                                                            editedItem.evidence
                                                        "
                                                        label="หลักฐาน"
                                                        chips
                                                        dense
                                                        class="mb-4"
                                                        @change="preview"
                                                    ></v-file-input>
                                                    <v-img
                                                        v-show="editedItem.url"
                                                        max-width="300"
                                                        :src="editedItem.url"
                                                        class="mb-4 mx-auto"
                                                        alt="หลักฐานการถวาย"
                                                    ></v-img>
                                                </v-col>
                                            </v-row>
                                            <!-- End Cheque -->
                                            <v-select
                                                v-model="editedItem.giveTypeId"
                                                label="ประเภทการถวาย"
                                                :items="giveTypes"
                                                item-text="name"
                                                item-value="id"
                                                outlined
                                                dense
                                            ></v-select>
                                            <v-row
                                                v-show="
                                                    editedItem.giveTypeId === 1
                                                "
                                            >
                                                <v-col>
                                                    <v-menu
                                                        ref="giveFrom"
                                                        v-model="
                                                            isShowGiveFromPicker
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        :return-value.sync="
                                                            editedItem.giveFrom
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template
                                                            #activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.giveFrom
                                                                "
                                                                label="จากเดือน"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-bind="attrs"
                                                                dense
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                editedItem.giveFrom
                                                            "
                                                            type="month"
                                                            no-title
                                                            scrollable
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    isShowGiveFromPicker = false
                                                                "
                                                            >
                                                                ยกเลิก
                                                            </v-btn>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    $refs.giveFrom.save(
                                                                        editedItem.giveFrom
                                                                    )
                                                                "
                                                            >
                                                                ตกลง
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                    <v-menu
                                                        ref="giveTo"
                                                        v-model="
                                                            isShowGiveToPicker
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
                                                        :return-value.sync="
                                                            editedItem.giveTo
                                                        "
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template
                                                            #activator="{
                                                                on,
                                                                attrs,
                                                            }"
                                                        >
                                                            <v-text-field
                                                                v-model="
                                                                    editedItem.giveTo
                                                                "
                                                                label="ถึงเดือน"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-bind="attrs"
                                                                dense
                                                                class="mb-4"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="
                                                                editedItem.giveTo
                                                            "
                                                            type="month"
                                                            no-title
                                                            scrollable
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    isShowGiveToPicker = false
                                                                "
                                                            >
                                                                ยกเลิก
                                                            </v-btn>
                                                            <v-btn
                                                                text
                                                                color="primary"
                                                                @click="
                                                                    $refs.giveTo.save(
                                                                        editedItem.giveTo
                                                                    )
                                                                "
                                                            >
                                                                ตกลง
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-select
                                                v-model="
                                                    editedItem.departmentId
                                                "
                                                label="แผนก"
                                                :items="departments"
                                                item-text="name"
                                                item-value="id"
                                                outlined
                                                dense
                                            ></v-select>
                                            <v-select
                                                v-if="role === 'ACCOUNTANT'"
                                                v-model="editedItem.ownerId"
                                                label="ผู้ติดตาม"
                                                :items="staffsWithFullname"
                                                item-text="fullName"
                                                item-value="id"
                                                outlined
                                                dense
                                            ></v-select>
                                        </v-container>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="secondary" text @click="close"
                                        >ยกเลิก</v-btn
                                    >
                                    <v-btn color="primary" text @click="save"
                                        >บันทึก</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="deleteDialog" max-width="300px">
                            <v-card>
                                <v-card-title>ยืนยันการลบข้อมูล</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="secondary"
                                        text
                                        @click="closeDelete"
                                        >ยกเลิก</v-btn
                                    >
                                    <v-btn
                                        color="error"
                                        text
                                        @click="confirmDelete"
                                        >ลบ</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="isShowEvidence" max-width="400px">
                            <v-card>
                                <v-card-title>หลักฐาน</v-card-title>
                                <v-card-text>
                                    <v-img
                                        max-width="400"
                                        :src="editedItem.url"
                                        class="mb-4 mx-auto"
                                        alt="หลักฐานการถวาย"
                                    ></v-img>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        text
                                        @click="isShowEvidence = false"
                                        >ปิด</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template #item.giveType="{ item }">
                    <div class="py-2" v-html="item.giveDetail"></div>
                </template>
                <template #item.paymentDetail="{ item }">
                    <div class="py-2" v-html="item.paymentDetail"></div>
                </template>
                <template #item.actions="{ item }">
                    <v-icon
                        v-show="item.evidence"
                        small
                        class="mr-2"
                        @click="showEvidence(item)"
                        >mdi-paperclip</v-icon
                    >
                    <v-icon small class="mr-2" @click="editItem(item)"
                        >mdi-pencil</v-icon
                    >
                    <v-icon small class="mr-2" @click="deleteItem(item)"
                        >mdi-delete</v-icon
                    >
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import { parseISO, set, format, getHours, getMinutes } from 'date-fns'
import numeral from 'numeral'

export default {
    data() {
        return {
            headers: [
                {
                    text: 'วันที่',
                    value: 'date',
                },
                {
                    text: 'ผู้ถวาย',
                    value: 'supporterFullname',
                },
                {
                    text: 'จำนวนเงิน',
                    value: 'amount',
                },
                {
                    text: 'ประเภทเงินถวาย',
                    value: 'giveType',
                },
                {
                    text: 'แผนก',
                    value: 'department.name',
                },
                {
                    text: 'ผู้ติดตาม',
                    value: 'ownerFullname',
                },
                {
                    text: 'ช่องทางการจ่ายเงิน',
                    value: 'paymentType.name',
                },
                {
                    text: 'รายละเอียดการจ่ายเงิน',
                    value: 'paymentDetail',
                },
                {
                    text: '',
                    value: 'actions',
                },
            ],
            isShowReceiveDatePicker: false,
            isShowTransferDatePicker: false,
            isShowTransferTimePicker: false,
            isShowGiveFromPicker: false,
            isShowGiveToPicker: false,
            isShowChequeDatePicker: false,
            alert: {
                isShow: false,
            },
            dialog: false,
            deleteDialog: false,
            isShowEvidence: false,
            editedItem: {
                paymentTypeId: 1,
                giveTypeId: 1,
                url: null,
                transferFromBankId: 1,
                transferToBankId: 1,
                chequeBankId: 1,
            },
            gives: [],
            staffs: [],
            supporters: [],
            banks: [],
            giveTypes: [],
            departments: [],
            paymentTypes: [],
            yfcBanks: [],
        }
    },
    computed: {
        formTitle() {
            return this.editedItem.id ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'
        },
        staffsWithFullname() {
            return this.staffs.map(fullname)
        },
        supportersWithFullname() {
            return this.supporters.map(fullname)
        },
        giveItems() {
            return this.gives.map((give) => {
                const item = {
                    ...give,
                    supporterFullname: `${give.supporter.firstname} ${give.supporter.lastname}`,
                    amount: numeral(give.amount).format('0,0.00'),
                    ownerFullname: `${give.owner.firstname} ${give.owner.lastname}`,
                }
                if (give.paymentTypeId === 1) {
                    item.date = format(
                        new Date(give.transferDate),
                        'yyyy/MM/dd'
                    )
                    item.paymentDetail = `
                        <div><span>วันเวลา:</span> ${format(
                            new Date(give.transferDate),
                            'yyyy/MM/dd hh:mm'
                        )}</div>
                        <div><span>จาก:</span> ${
                            item.transferFromBank.name
                        }</div>
                        <div><span>ไปที่:</span> ${
                            item.transferToBank.name
                        }</div>
                    `
                }
                if (give.paymentTypeId === 2) {
                    item.date = format(new Date(give.receiveDate), 'yyyy/MM/dd')
                    item.paymentDetail = '-'
                }
                if (give.paymentTypeId === 3) {
                    item.date = format(new Date(give.chequeDate), 'yyyy/MM/dd')
                    item.paymentDetail = `
                        <div><span>เลขที่:</span> ${give.chequeNumber}</div>
                        <div><span>วันที่:</span> ${item.date}</div>
                        <div><span>ธนาคาร:</span> ${give.chequeBank.name}</div>
                        <div><span>สาขา:</span> ${give.chequeBankBranch}</div>
                    `
                }
                if (give.giveTypeId === 1) {
                    item.giveDetail = `
                        <div>${give.giveType.name}</div>
                        <div><span>จาก:</span> ${format(
                            new Date(give.giveFrom),
                            'yyyy-MM'
                        )}</div>
                        <div><span>ถึง:</span> ${format(
                            new Date(give.giveTo),
                            'yyyy-MM'
                        )}</div>
                    `
                } else {
                    item.giveDetail = give.giveType.name
                }
                if (give.evidence) {
                    item.url = this.imageURL(give.evidence)
                }
                return item
            })
        },
        role() {
            return (this.$store.state.user.data && this.$store.state.user.data.role) || ''
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        deleteDialog(val) {
            val || this.closeDelete()
        },
        isShowEvidence(val) {
            val || this.hideEvidence()
        },
    },
    async mounted() {
        try {
            const [
                gives,
                supporters,
                paymentTypes,
                banks,
                giveTypes,
                departments,
                yfcBanks,
            ] = await Promise.all([
                this.$axios.$get('/gives'),
                this.$axios.$get('/supporters'),
                this.$axios.$get('/paymenttypes'),
                this.$axios.$get('/banks'),
                this.$axios.$get('/givetypes'),
                this.$axios.$get('/departments'),
                this.$axios.$get('/yfcbanks'),
            ])
            this.gives = gives
            this.supporters = supporters
            this.paymentTypes = paymentTypes
            this.banks = banks
            this.giveTypes = giveTypes
            this.departments = departments
            this.yfcBanks = yfcBanks
            if (this.role === 'ACCOUNTANT') {
                const staffs = await this.$axios.$get('/staffs')
                this.staffs = staffs
            }
        } catch (err) {
            console.error(err)
        }
    },
    methods: {
        reset() {
            this.editedItem = {
                paymentTypeId: 1,
                giveTypeId: 1,
                url: null,
                transferFromBankId: 1,
                transferToBankId: 1,
                chequeBankId: 1,
            }
        },
        close() {
            this.dialog = false
            this.reset()
        },
        async save() {
            try {
                const give = {
                    id: this.editedItem.id,
                    supporterId: this.editedItem.supporterId,
                    amount: this.editedItem.amount,
                    paymentTypeId: this.editedItem.paymentTypeId,
                    giveTypeId: this.editedItem.giveTypeId,
                    ownerId: this.editedItem.ownerId,
                    departmentId: this.editedItem.departmentId,
                }

                if (give.paymentTypeId === 1) {
                    // bank transfer
                    const [hours, minutes] = this.editedItem.transferTime.split(
                        ':'
                    )
                    give.transferDate = set(
                        parseISO(this.editedItem.transferDate),
                        { hours, minutes }
                    )
                    give.transferFromBankId = this.editedItem.transferFromBankId
                    give.transferToBankId = this.editedItem.transferToBankId
                    give.evidence = this.editedItem.evidence
                }
                if (give.paymentTypeId === 2) {
                    // cash
                    give.receiveDate = parseISO(this.editedItem.receiveDate)
                }
                if (give.paymentTypeId === 3) {
                    // cheque
                    give.chequeBankId = this.editedItem.chequeBankId
                    give.chequeBankBranch = this.editedItem.chequeBankBranch
                    give.chequeNumber = this.editedItem.chequeNumber
                    give.chequeDate = parseISO(this.editedItem.chequeDate)
                    give.evidence = this.editedItem.evidence
                }
                if (give.giveTypeId === 1) {
                    give.giveFrom = parseISO(this.editedItem.giveFrom)
                    give.giveTo = parseISO(this.editedItem.giveTo)
                }

                const data = new FormData()
                Object.keys(give).forEach((key) => {
                    data.append(key, give[key])
                })
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }

                if (give.id) {
                    await this.$axios.$put(`/gives/${give.id}`, data, config)
                } else {
                    await this.$axios.$post('/gives', data, config)
                }
                this.gives = await this.$axios.$get('/gives')

                this.close()
                this.showSuccessAlert()
            } catch (err) {
                console.error(err)
                this.close()
                this.showFailAlert()
            }
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
        },
        editItem(item) {
            this.dialog = true
            const found = this.gives.find((give) => give.id === item.id)
            this.editedItem = {
                ...found,
                evidence: null,
                url: this.imageURL(found.evidence),
            }
            if (found.paymentTypeId === 1) {
                const transferDate = parseISO(found.transferDate)
                const transferTime = `${getHours(transferDate)}:${getMinutes(
                    transferDate
                )}`
                this.editedItem.transferDate = format(
                    transferDate,
                    'yyyy-MM-dd'
                )
                this.editedItem.transferTime = transferTime
            }
            if (found.paymentTypeId === 2) {
                this.editedItem.receiveDate = format(
                    parseISO(found.receiveDate),
                    'yyyy-MM-dd'
                )
            }
            if (found.paymentTypeId === 3) {
                this.editedItem.chequeDate = format(
                    parseISO(found.chequeDate),
                    'yyyy-MM-dd'
                )
            }
            if (found.giveTypeId === 1) {
                this.editedItem.giveFrom = format(
                    parseISO(found.giveFrom),
                    'yyyy-MM'
                )
                this.editedItem.giveTo = format(
                    parseISO(found.giveTo),
                    'yyyy-MM'
                )
            }
        },
        deleteItem(item) {
            this.deleteDialog = true
            this.editedItem = { id: item.id }
        },
        closeDelete() {
            this.deleteDialog = false
            this.reset()
        },
        async confirmDelete() {
            try {
                await this.$axios.$delete(`/gives/${this.editedItem.id}`)
                this.gives = await this.$axios.$get('/gives')
                this.closeDelete()
                this.showSuccessAlert()
            } catch (e) {
                console.error(e)
                this.closeDelete()
                this.showFailAlert()
            }
        },
        preview() {
            if (this.editedItem.evidence) {
                this.editedItem.url = URL.createObjectURL(
                    this.editedItem.evidence
                )
            }
        },
        showEvidence(item) {
            this.isShowEvidence = true
            this.editedItem.url = item.url
        },
        hideEvidence() {
            this.isShowEvidence = false
            this.editedItem.url = null
        },
        imageURL(evidence) {
            return `${this.$axios.defaults.baseURL}/evidence/${evidence}`
        },
    },
}

function fullname(person) {
    return { ...person, fullName: `${person.firstname} ${person.lastname}` }
}
</script>

<style></style>
