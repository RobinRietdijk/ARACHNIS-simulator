<template>
    <v-card>
        <v-card-title>
            <v-container class="pa-2">
                <v-row class="py-1">
                    <v-col class="pa-0">DIMENSIONS</v-col>
                    <v-col class="pa-0 reset-btn" justify-end>
                        <v-btn
                            variant="plain"
                            size="small"
                        >
                            RESET
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>            
        </v-card-title>
        <v-card-text class="pb-0">
            <v-container>
                <v-row>
                    <v-col
                        v-for="field in fields"
                        :key=field.name 
                        class="py-0"
                    >
                        <v-text-field 
                            v-model="field.value"
                            :label="field.name"
                            density="compact"
                            variant="outlined"
                            :rules="[rules.isNum, rules.notEmpty]"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        fields: [
            {
                name:"Front",
                value: 100,
            },
            {
                name:"Sides",
                value: 100,
            },
            {
                name:"Coxia",
                value: 100,
            },
            {
                name:"Femur",
                value: 100,
            },
            {
                name:"Tibia",
                value: 100,
            }
        ],

        rules: {
            isNum: value => !isNaN(value) || 'NaN',
            notEmpty: value => !!value || 'NaN'
        }
    }),
}
</script>

<style scoped>
.reset-btn {
    flex: 0 0 1px;
}
</style>