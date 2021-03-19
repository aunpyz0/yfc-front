<template>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="items" class="elevation-1">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title
                            >ช่องทางการจ่ายเงินทั้งหมด</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
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
                    text: 'ช่องทางการจ่ายเงิน',
                    value: 'name',
                },
            ],
            items: [],
        }
    },
    async mounted() {
        try {
            this.items = await this.$axios.$get('/paymenttypes')
        } catch (err) {
            console.error(err)
        }
    },
}
</script>

<style></style>
