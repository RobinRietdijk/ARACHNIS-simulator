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
                <v-row
                    v-for="row in leg_rows"
                    :key="row.name"
                >
                    <v-col
                        v-for="leg in row.legs"
                        :key="leg.name"
                    >
                        <v-row><span class="pb-1"><b>{{ leg.name }}</b></span></v-row>
                        <v-row>
                            <v-text-field 
                                class="pa-1"
                                label="alpha"
                                v-model="leg.alpha"
                                density="compact"
                                variant="outlined"
                                :rules="[rules.isNum, rules.notEmpty, rules.max(leg.alpha, 90), rules.min(leg.alpha, 0)]"
                            />
                            <v-text-field 
                                class="pa-1"
                                label="beta"
                                v-model="leg.beta"
                                density="compact"
                                variant="outlined"
                                :rules="[rules.isNum, rules.notEmpty, rules.max(leg.beta, 180), rules.min(leg.beta, 0)]"
                            />
                            <v-text-field 
                                class="pa-1"
                                label="gamma"
                                v-model="leg.gamma"
                                density="compact"
                                variant="outlined"
                                :rules="[rules.isNum, rules.notEmpty, rules.max(leg.gamma, 180), rules.min(leg.gamma, 0)]"
                            />
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        leg_rows: [
            {
                name: "Front",
                legs: [{
                        name: "FrontLeft",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    },
                    {
                        name: "FrontRight",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    }],
            },
            {
                name: "MiddleFront",
                legs: [{
                        name: "MiddleFrontLeft",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    },
                    {
                        name: "MiddleFrontRight",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    }],
            },
            {
                name: "MiddleBack",
                legs: [{
                        name: "MiddleBackLeft",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    },
                    {
                        name: "MiddleBackRight",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    }],
            },
            {
                name:"Back",
                legs: [{
                        name: "BackLeft",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    },
                    {
                        name: "BackRight",
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                    }],
            }
        ],

        rules: {
            isNum: value => !isNaN(value) || 'NaN',
            notEmpty: value => !!value || 'NaN',
            max: (value, maxVal) => value <= maxVal || 'max=' + maxVal,
            min: (value, minVal) => value >= minVal || 'min=' + minVal
        }
    })
}
</script>

<style scoped>
.reset-btn {
    flex: 0 0 1px;
}
</style>