<template>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="items" class="elevation-1">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>ธนาคารทั้งหมดของ YFC</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="300px">
                            <template #activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    เพิ่มข้อมูล
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span>{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        v-model="editedItem.name"
                                        label="ชื่อบัญชี"
                                        outlined
                                        dense
                                        autofocus
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editedItem.accountNumber"
                                        label="เลขบัญชี"
                                        outlined
                                        dense
                                        autofocus
                                    ></v-text-field>
                                    <v-select
                                        v-model="editedItem.bankId"
                                        :items="banks"
                                        item-text="name"
                                        item-value="id"
                                        label="ธนาคาร"
                                        outlined
                                        dense
                                        autofocus
                                    ></v-select>
                                    <v-text-field
                                        v-model="editedItem.bankBranch"
                                        label="สาขา ธนาคาร"
                                        outlined
                                        dense
                                        autofocus
                                    ></v-text-field>
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
                    </v-toolbar>
                </template>
                <template #item.actions="{ item }">
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
export default {
    data() {
        return {
            headers: [
                {
                    text: 'ชื่อบัญชี',
                    value: 'name',
                },
                {
                    text: 'เลขที่บัญชี',
                    value: 'accountNumber',
                },
                {
                    text: 'ธนาคาร',
                    value: 'bank.name',
                },
                {
                    text: 'สาขา',
                    value: 'bankBranch',
                },
                {
                    text: '',
                    value: 'actions',
                },
            ],
            items: [],
            banks: [],
            dialog: false,
            deleteDialog: false,
            editedItem: {},
        }
    },
    computed: {
        formTitle() {
            return this.editedItem.id ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        deleteDialog(val) {
            val || this.closeDelete()
        },
    },
    async mounted() {
        try {
            const [ yfcbanks, banks ] = await Promise.all([
                this.$axios.$get('/yfcbanks'),
                this.$axios.$get('/banks'),
            ])
            this.items = yfcbanks
            this.banks = banks
        } catch (err) {
            console.error(err)
        }
    },
    methods: {
        close() {
            this.dialog = false
            this.editedItem = {}
        },
        async save() {
            try {
                if (this.editedItem.id) {
                    await this.$axios.$put(`/yfcbanks/${this.editedItem.id}`, {
                        id: this.editedItem.id,
                        name: this.editedItem.name,
                        accountNumber: this.editedItem.accountNumber,
                        bankId: this.editedItem.bankId,
                        bankBranch: this.editedItem.bankBranch,
                    })
                } else {
                    await this.$axios.$post('/yfcbanks', {
                        name: this.editedItem.name,
                        accountNumber: this.editedItem.accountNumber,
                        bankId: this.editedItem.bankId,
                        bankBranch: this.editedItem.bankBranch,
                    })
                }
                this.items = await this.$axios.$get('/yfcbanks')
                this.close()
            } catch (e) {
                console.error(e)
                this.close()
            }
        },
        editItem(item) {
            this.dialog = true
            this.editedItem = {
                id: item.id,
                name: item.name,
                accountNumber: item.accountNumber,
                bankId: item.bankId,
                bankBranch: item.bankBranch
            }
        },
        deleteItem(item) {
            this.deleteDialog = true
            this.editedItem = { id: item.id }
        },
        closeDelete() {
            this.deleteDialog = false
            this.editedItem = {}
        },
        async confirmDelete() {
            try {
                await this.$axios.$delete(`/yfcbanks/${this.editedItem.id}`)
                this.items = await this.$axios.$get('/yfcbanks')
                this.closeDelete()
            } catch (e) {
                console.error(e)
                this.closeDelete()
            }
        },
    },
}
</script>

<style></style>
