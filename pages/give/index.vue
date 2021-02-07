<template>
  <v-row>
    <v-col md="8" offset-md="2">
      <div class="d-flex justify-end">
        <v-btn elevation="2" class="my-3" color="primary" to="/give/new">เพิ่มรายการ</v-btn>
      </div>
      <v-data-table :headers="headers" :items="items"></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
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
          value: 'supporter',
        },
        {
          text: 'จำนวนเงิน',
          value: 'amount',
        },
        {
          text: 'ประเภท',
          value: 'give_type',
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
          text: 'ผู้รับเงิน',
          value: 'receiver',
        },
        {
          text: 'ช่องทาง',
          value: 'payment_type',
        },
        {
          text: 'รายละเอียด',
          value: 'payment_detail',
        },
      ],
      items: [
        {
          date: new Date(),
          supporter: 'test',
          amount: 100,
          give_type: 'รายเดือน',
          department: 'test',
          owner: 'เอ',
          receiver: 'นาย',
          payment_type: 'T/R',
          payment_detail: '-',
        },
        {
          date: new Date(),
          supporter: 'test',
          amount: 100,
          give_type: 'รายเดือน',
          department: 'test',
          owner: 'เอ',
          receiver: 'นาย',
          payment_type: 'T/R',
          payment_detail: '-',
        },
      ],
    }
  },
}
</script>

<style>
</style>
