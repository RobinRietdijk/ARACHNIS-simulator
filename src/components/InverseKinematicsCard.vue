<template>
    <v-card>
        <v-card-title>
            <v-container class="pa-2">
                <v-row class="py-1">
                    <v-col class="pa-0">INVERSE KINEMATICS</v-col>
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
                    v-for="slider_row in sliders"
                    :key="slider_row"
                >
                    <v-col
                        class="pa-0"
                        v-for="slider in slider_row"
                        :key="slider.name"
                    >
                        <span class="pl-5 slider-caption"><b>{{ slider.name + ": " }}</b></span>
                        <span class="slider-caption">{{ slider.value }}</span>
                        <v-slider
                            v-model="slider.value"
                            step="0.01"
                            :min="slider.min"
                            :max="slider.max"
                        ></v-slider>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        sliders: [
            [{
                name: "tx",
                value: 0,
                min: -1,
                max: 1
            },
            {
                name: "ty",
                value: 0,
                min: -1,
                max: 1
            },
            {
                name: "tz",
                value: 0,
                min: -1,
                max: 1
            }],
            [{
                name: "rx",
                value: 0,
                min: -30,
                max: 30
            },
            {
                name: "ry",
                value: 0,
                min: -30,
                max: 30
            },
            {
                name: "rz",
                value: 0,
                min: -30,
                max: 30
            }],
            [{
                name: "hipPosition",
                value: 0,
                min: -100,
                max: 100
            },
            {
                name: "legPosition",
                value: 0,
                min: -100,
                max: 100
            }]
        ]
    })
}
</script>

<style scoped>
.reset-btn {
    flex: 0 0 1px;
}
.slider-caption {
    opacity: 0.7;
}
</style>