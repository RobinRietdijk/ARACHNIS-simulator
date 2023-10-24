<template>
    <v-card>
        <v-card-title>
            <v-container class="pa-2">
                <v-row class="py-1">
                    <v-col class="pa-0">WALKING GAITS</v-col>
                    <v-col class="pa-0 reset-btn" justify-end>
                        <v-btn variant="plain" size="small" color="error">
                            RESET
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
        <v-card-text class="pb-0">
            <v-container>
                <v-row>
                    <v-col>
                        <v-switch v-model="isRunning" :label="isRunning ? 'Running' : 'Paused'" density="compact"
                            loading="white" color="primary" hide-details />
                        <v-switch v-model="isBackwards" :label="`isBackwards: ${isBackwards.toString()}`" density="compact"
                            hide-details />
                        <v-switch v-model="isRotating" :label="`isRotating: ${isRotating.toString()}`" density="compact"
                            hide-details />
                    </v-col>
                    <v-col>
                        <v-select></v-select>
                    </v-col>
                </v-row>
                <v-row v-for="slider_row in sliders" :key="slider_row">
                    <v-col class="pa-0" v-for="slider in slider_row" :key="slider.name">
                        <span class="pl-5 slider-caption"><b>{{ slider.name + ": " }}</b></span>
                        <span class="slider-caption">{{ slider.value }}</span>
                        <v-slider v-model="slider.value" :step="slider.step" :min="slider.min" :max="slider.max"
                            hide-details></v-slider>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        isRunning: false,
        isBackwards: false,
        isRotating: false,
        sliders: [
            [{
                name: "hipSwing",
                value: 25,
                min: 10,
                max: 40,
                step: 0.01
            },
            {
                name: "liftSwing",
                value: 40,
                min: 10,
                max: 70,
                step: 0.01
            }],
            [{
                name: "legStance",
                value: 0,
                min: -50,
                max: 50,
                step: 0.01
            },
            {
                name: "hipStance",
                value: 20,
                min: 0,
                max: 40,
                step: 0.01
            }],
            [{
                name: "tx",
                value: 0,
                min: -0.25,
                max: 0.25,
                step: 0.01
            },
            {
                name: "tz",
                value: 0,
                min: -0.5,
                max: 0.5,
                step: 0.01
            }],
            [{
                name: "rx",
                value: 0,
                min: -15,
                max: 15,
                step: 0.01
            },
            {
                name: "ry",
                value: 0,
                min: -15,
                max: 15,
                step: 0.01
            }],
            [{
                name: "stepCount",
                value: 5,
                min: 3,
                max: 7,
                step: 1
            }]
        ]
    })
}
</script>

<style scoped>
.reset-btn {
    flex: 0 0 1px;
}
</style>