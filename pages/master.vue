<template>
    <v-row>
        <v-col md="3">
            <v-card>
                <v-list>
                    <v-list-item-group
                        color="primary"
                    >
                        <v-list-item to="/master/givetype" nuxt>
                            <v-list-item-content>
                                <v-list-item-title>ประเภทการถวาย</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/master/department" nuxt>
                            <v-list-item-content>
                                <v-list-item-title>แผนก</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/master/bank" nuxt>
                            <v-list-item-content>
                                <v-list-item-title>ธนาคาร</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/master/paymenttype" nuxt>
                            <v-list-item-content>
                                <v-list-item-title>ช่องทางการจ่ายเงิน</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item to="/master/role" nuxt>
                            <v-list-item-content>
                                <v-list-item-title>Role</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-col>
        <v-col md="8">
            <NuxtChild />
        </v-col>
    </v-row>
</template>

<script>
export default {
}
</script>

<style>

</style>
