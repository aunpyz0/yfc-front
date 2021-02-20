<template>
    <v-row>
        <v-col>
            <v-data-table
                :headers="headers"
                :items="givetypes"
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

}
</script>

<style>

</style>
