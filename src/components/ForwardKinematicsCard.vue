<template>
    <v-card>
        <v-card-title>
            <v-container class="pa-2">
                <v-row class="py-1">
                    <v-col class="pa-0">FORWARD KINEMATICS</v-col>
                    <v-col class="pa-0 reset-btn" justify-end>
                        <v-btn
                            variant="plain"
                            size="small"
                            color="error"
                        >
                            RESET
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>            
        </v-card-title>
        <v-card-text class="pb-0">
            <v-container>
                
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.reset-btn {
    flex: 0 0 1px;
}
</style>