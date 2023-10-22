<template>
    <v-card>
        <v-card-title>
            <v-container class="pa-2">
                <v-row class="py-1">
                    <v-col class="pa-0">LEG POSITIONS</v-col>
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
                <v-row>
                    
                </v-row>
            </v-container>            
        </v-card-title>
        <v-card-text class="pb-0">
            <v-container>
                <v-row
                    v-for="slider in sliders"
                    :key="slider"
                >
                    <v-col
                        class="pa-0"
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
            {
                name: "alpha",
                value: 0,
                min: -180,
                max: 180,
            },
            {
                name: "beta",
                value: 0,
                min: -180,
                max: 180,
            },
            {
                name: "gamma",
                value: 0,
                min: -180,
                max: 180,
            }
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