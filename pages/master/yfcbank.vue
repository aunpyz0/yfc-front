<template>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="items" class="elevation-1">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>ธนาคารทั้งหมดของ YFC</v-toolbar-title>
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
                    text: 'ชื่อบัญชี',
                    value: 'name',
                },
                {
                    text: 'เลขที่บัญชี',
                    value: 'accountNo',
                },
            ],
            items: [],
        }
    },
    async mounted() {
        try {
            this.items = await this.$axios.$get('/yfcbanks')
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<style></style>
