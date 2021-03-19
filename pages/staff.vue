<template>
    <v-row>
        <v-col>
            <v-data-table
                :headers="headers"
                :items="staffItems"
                class="elevation-1"
            >
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>สตาฟทั้งหมด</v-toolbar-title>
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
                                        label="รหัสสตาฟ"
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
                                    <v-select
                                        v-model="editedItem.roleId"
                                        label="Role"
                                        :items="roles"
                                        item-text="name"
                                        item-value="id"
                                        outlined
                                        dense
                                    ></v-select>
                                    <v-text-field
                                        v-model="editedItem.email"
                                        label="อีเมล์"
                                        outlined
                                        dense
                                        type="email"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editedItem.password"
                                        label="Password"
                                        outlined
                                        dense
                                        type="password"
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
                    text: 'รหัสสตาฟ',
                    value: 'code',
                },
                {
                    text: 'ชื่อ นามสกุล',
                    value: 'fullname',
                },
                {
                    text: 'อีเมล์',
                    value: 'email',
                },
                {
                    text: 'role',
                    value: 'role.name',
                },
                {
                    text: '',
                    value: 'actions',
                },
            ],
            items: [],
            roles: [],
            dialog: false,
            deleteDialog: false,
            editedItem: {},
        }
    },
    computed: {
        formTitle() {
            return this.editedItem.id ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'
        },
        staffItems() {
            return this.items.map((staff) => {
                return {
                    ...staff,
                    fullname: `${staff.firstname} ${staff.lastname}`,
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
            const [staffs, roles] = await Promise.all([
                this.$axios.$get('/staffs'),
                this.$axios.$get('/roles'),
            ])
            this.items = staffs
            this.roles = roles
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
                const staff = {
                    id: this.editedItem.id,
                    code: this.editedItem.code,
                    firstname: this.editedItem.firstname,
                    lastname: this.editedItem.lastname,
                    roleId: this.editedItem.roleId,
                    email: this.editedItem.email,
                    password: this.editedItem.password,
                }
                if (staff.id) {
                    await this.$axios.$put(`/staffs/${staff.id}`, staff)
                } else {
                    await this.$axios.$post('/staffs', staff)
                }
                this.items = await this.$axios.$get('/staffs')
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
                await this.$axios.$delete(`/staffs/${this.editedItem.id}`)
                this.items = await this.$axios.$get('/staffs')
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
