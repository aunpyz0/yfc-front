<template>
    <v-row>
        <v-col>
            <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-toolbar-title>ประเภทการถวายทั้งหมด</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog
                            v-model="dialog"
                            max-width="300px"
                        >
                            <template v-slot:activator="{ on, attrs }">
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
                                    <span >{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        label="ประเภทการถวาย"
                                        outlined
                                        dense
                                        v-model="editedItem.name"
                                        autofocus
                                    ></v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="secondary" text @click="close">ยกเลิก</v-btn>
                                    <v-btn color="primary" text @click="save">บันทึก</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                            v-model="deleteDialog"
                            max-width="300px"
                        >
                            <v-card>
                                <v-card-title>ยืนยันการลบข้อมูล</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="secondary" text @click="closeDelete">ยกเลิก</v-btn>
                                    <v-btn color="error" text @click="confirmDelete">ลบ</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        formTitle() {
            return this.editedItem.id ?  'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        deleteDialog(val) {
            val || this.closeDelete()
        },
    },
    data() {
        return {
            headers: [
                {
                    text: 'ประเภทการถวาย',
                    value: 'name'
                },
                {
                    text: '',
                    value: 'actions'
                }
            ],
            items: [],
            dialog: false,
            deleteDialog: false,
            editedItem: {}
        }
    },
    async mounted() {
        try {
            this.items = await this.$axios.$get('/givetypes')
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
                    await this.$axios.$put(`/givetypes/${this.editedItem.id}`, {
                        id: this.editedItem.id,
                        name: this.editedItem.name,
                    })
                } else {
                    await this.$axios.$post('/givetypes', {
                        name: this.editedItem.name,
                    })
                }
                this.items = await this.$axios.$get('/givetypes')
                this.close()
            } catch (e) {
                console.error(e)
                this.close()
            }
        },
        editItem(item) {
            this.dialog = true
            this.editedItem = { id: item.id, name: item.name }
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
                await this.$axios.$delete(`/givetypes/${this.editedItem.id}`)
                this.items = await this.$axios.$get('/givetypes')
                this.closeDelete()
            } catch (e) {
                console.error(e)
                this.closeDelete()
            }
        }
    }
}
</script>

<style>

</style>
