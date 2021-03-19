<template>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="items" class="elevation-1">
                <template #top>
                    <v-toolbar flat>
                        <v-toolbar-title>All Role</v-toolbar-title>
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
                    text: 'Role',
                    value: 'name',
                },
            ],
            items: [],
        }
    },
    async mounted() {
        try {
            this.items = await this.$axios.$get('/roles')
        } catch (err) {
            console.error(err)
        }
    },
}
</script>

<style></style>
