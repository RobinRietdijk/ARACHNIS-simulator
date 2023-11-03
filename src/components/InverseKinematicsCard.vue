<template>
    <v-card>
        <v-card-title>
            <v-container class="pa-2">
                <v-row class="py-1">
                    <v-col class="pa-0">INVERSE KINEMATICS</v-col>
                    <v-col class="pa-0 reset-btn" justify-end>
                        <v-btn variant="plain" size="small" color="error">
                            RESET
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
        <v-card-text class="pb-0 px-0">
            <v-container>
                <v-row>
                    <v-col class="pa-0">
                        <div class="text-caption pl-4">Number of segments: <span>{{ n_segments }}</span></div>
                        <v-slider 
                            v-model="n_segments"
                            :min="min_segments"
                            :max="max_segments"
                            :step="1"
                            show-ticks="always"
                            thumb-label
                            @update:model-value="updateSegments($event)"
                        >
                            <template v-slot:prepend>
                                <v-btn
                                    size="small"
                                    variant="text"
                                    icon="mdi-minus"
                                    :color="color"
                                    :disabled="n_segments <= min_segments"
                                    @click="decrement_segments"
                                ></v-btn>
                                </template>

                                <template v-slot:append>
                                <v-btn
                                    size="small"
                                    variant="text"
                                    icon="mdi-plus"
                                    :color="color"
                                    :disabled="n_segments >= max_segments"
                                    @click="increment_segments"
                                ></v-btn>
                            </template>
                        </v-slider>
                    </v-col>
                </v-row>
                <v-divider />
                <v-container class="overflow-y-scroll mh-500">
                    <v-row 
                        v-for="segment in segments"
                        :key="segment"
                    >
                        <v-col cols="1">
                            <div>{{ segment.id }}:</div>
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col class="pa-0" cols="3">
                                    <v-select 
                                        v-model="segment.axis"
                                        density="compact"
                                        persistent-hint
                                        :items="axes"
                                        :hint="`${axis.title}, ${axis.hint}`"
                                    />
                                </v-col>
                                <v-col class="pa-0">
                                    <v-slider
                                        v-model="segment.length"
                                        :min="0"
                                        :max="50"
                                        :step="1"
                                        thumb-label
                                        thumb-size="10"
                                        show-ticks
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="pa-0">
                                    <v-range-slider 
                                        v-model="segment.range"
                                        :label="'Range: [' + segment.range[0] + ', ' + segment.range[1] + ']:'"
                                        thumb-label
                                        thumb-size="10"
                                        show-ticks
                                        step="10"
                                        :min="0"
                                        :max="360"
                                        strict
                                    />
                                </v-col>
                            </v-row>    
                        </v-col>
                    </v-row>
                </v-container>  
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { useInverseKinematicsStore } from '@/store/inverseKinematics';
import { storeToRefs } from 'pinia';
import Vector3D from './Geometry/Vector3D';
export default {
    data: () => ({
        min_segments: 1,
        max_segments: 10,
        axis: {
            title: "",
            value: "",
            hint: ""
        },
        axes: [
            {
                title: "(1, 0, 0)",
                value: new Vector3D(1, 0, 0),
                hint: "x-axis"
            },
            {
                title: "(0, 1, 0)",
                value: new Vector3D(0, 1, 0),
                hint: "y-axis"
            },
            {
                title: "(0, 0, 1)",
                value: new Vector3D(0, 0, 1),
                hint: "z-axis"
            },
        ]
    }),
    methods: {
        updateSegments(val) {
            this.inverseKinematics.set_n_segments(val);
        },

        increment_segments() {
            this.n_segments++;
            this.updateSegments(this.n_segments);
        },

        decrement_segments() {
            this.n_segments--;
            this.updateSegments(this.n_segments);
        }
    },
    setup() {
        const inverseKinematics = useInverseKinematicsStore();
        const { n_segments, segments } = storeToRefs(inverseKinematics);
        inverseKinematics.set_n_segments(2);
        return {
            inverseKinematics,
            n_segments,
            segments,
        };
    }
}
</script>

<style scoped>
.reset-btn {
    flex: 0 0 1px;
}

.slider-caption {
    opacity: 0.7;
}

.overflow-y-scroll {
    overflow-y: scroll;
}
.mh-500 {
    max-height: 500px;
}
</style>