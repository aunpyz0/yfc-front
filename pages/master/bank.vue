<template>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="items" class="elevation-1">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>ธนาคารทั้งหมด</v-toolbar-title>
                    </v-toolbar>
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
                    text: 'ธนาคาร',
                    value: 'name',
                }
            ],
            items: [],
        }
    },
    async mounted() {
        try {
            this.items = await this.$axios.$get('/banks')
        } catch (err) {
            console.error(err)
        }
    },
}
</script>

<style></style>
