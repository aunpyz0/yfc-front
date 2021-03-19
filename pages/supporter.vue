<template>
    <v-row>
        <v-col>
            <v-data-table
                :headers="headers"
                :items="supporterItems"
                class="elevation-1"
            >
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>ผู้ถวายทั้งหมด</v-toolbar-title>
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
                                    เพิ่มข้อมูล
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span>{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        v-model="editedItem.code"
                                        label="รหัสผู้ถวาย"
                                        outlined
                                        dense
                                        autofocus
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editedItem.firstname"
                                        label="ชื่อ"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editedItem.lastname"
                                        label="นามสกุล"
                                        outlined
                                        dense
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
                    text: 'รหัสผู้ถวาย',
                    value: 'code',
                },
                {
                    text: 'ชื่อ นามสกุล',
                    value: 'fullname',
                },
                {
                    text: '',
                    value: 'actions',
                },
            ],
            items: [],
            dialog: false,
            deleteDialog: false,
            editedItem: {},
        }
    },
    computed: {
        formTitle() {
            return this.editedItem.id ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'
        },
        supporterItems() {
            return this.items.map((supporter) => {
                return {
                    ...supporter,
                    fullname: `${supporter.firstname} ${supporter.lastname}`,
                }
            })
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
            this.items = await this.$axios.$get('/supporters')
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
                const supporter = {
                    id: this.editedItem.id,
                    code: this.editedItem.code,
                    firstname: this.editedItem.firstname,
                    lastname: this.editedItem.lastname,
                }
                if (supporter.id) {
                    await this.$axios.$put(
                        `/supporters/${supporter.id}`,
                        supporter
                    )
                } else {
                    await this.$axios.$post('/supporters', supporter)
                }
                this.items = await this.$axios.$get('/supporters')
                this.close()
            } catch (e) {
                console.error(e)
                this.close()
            }
        },
        editItem(item) {
            this.dialog = true
            this.editedItem = { ...item }
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
                await this.$axios.$delete(`/supporters/${this.editedItem.id}`)
                this.items = await this.$axios.$get('/supporters')
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
