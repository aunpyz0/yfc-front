# yfc-front

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

ระบบ บันทึกเงินถวาย

ปัจจุบัน
1 รายการ -> กรอก excel 8 sheet

report ->
    1. เงินถวายเดือนนี้เท่าไร ของ YFC
    2. ต่อคนมีเท่าไร
    3. เหลือยอดที่ต้องหาอีกเท่าไรในเดือนนี้ / ปีนี้

เงิน -> สตาฟ -> บัญชี -> กรอก excel -> กรอก express -> [ออกใบเสร็จ]
                        [report]       


ตอนนี้เงินบัญชี จริง มีเท่าไร แล้ว ตรงกับยอดที่บันทึกมั้ย

โอน

เช็ค

เงินสด




3 step

บันทึยอดเงินเมื่อมีเงินเข้าธนาคาร -> กรอก -> ออกใบเสร็จ
โอน/เช็ค/เงินสดฝากธนาคาร

from who
to whom (staff, department)
for what (monthly, one time)

เงิน 1 ก้อนที่เข้ามา อาจจะมี หลาย purpose
    many to whom
    many for what
