<template>
    <v-row>
        <v-col>
            <div class="d-flex justify-end">
                <v-btn elevation="2" class="my-3" color="primary" to="/give/new"
                    >เพิ่มรายการ</v-btn
                >
            </div>
            <v-data-table :headers="headers" :items="giveItems"></v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import format from 'date-fns/format'
import numeral from 'numeral'

export default {
    computed: {
        giveItems() {
            return this.gives.map(give => {
                let paymentDetail = '-'
                return {
                    date: format(new Date(give.transferDate), 'yyyy/MM/dd'),
                    supporter: `${give.supporter.firstname} ${give.supporter.lastname}`,
                    amount: numeral(give.amount).format('0,0.00'),
                    giveType: give.giveType.name,
                    department: give.department.name,
                    owner: `${give.owner.firstname} ${give.owner.lastname}`,
                    paymentType: give.paymentType.name,
                    paymentDetail
                }
            })
        }
    },
    data() {
        return {
            headers: [
                {
                    text: 'วันที่',
                    value: 'date',
                },
                {
                    text: 'ผู้ถวาย',
                    value: 'supporter',
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
                    value: 'department',
                },
                {
                    text: 'ผู้ติดตาม',
                    value: 'owner',
                },
                {
                    text: 'ช่องทางการจ่ายเงิน',
                    value: 'paymentType',
                },
                {
                    text: 'รายละเอียดการจ่ายเงิน',
                    value: 'paymentDetail',
                },
            ],
            gives: [],
        }
    },
    async mounted() {
        try {
            this.gives = await this.$axios.$get('/gives')
        } catch (e) {
            console.error(e)
        }
    }
}
</script>

<style></style>
