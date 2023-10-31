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
        <v-card-text class="pb-0">
            <v-container>
                <v-row>
                    <v-col class="pa-0">
                        <div class="text-caption">Number of segments:</div>
                        <v-slider 
                            v-model="n_segments"
                            :min="1"
                            :max="10"
                            :step="1"
                            show-ticks="always"
                            thumb-label
                            @update:model-value="updateSegments($event)"
                        />
                    </v-col>
                </v-row>
                <v-divider />
                <v-container class="overflow-auto">
                    <v-row 
                        v-for="segment in segments"
                        :key="segment"
                    >
                        <div class="text">Segment {{ segment.id }}:</div>
                        <v-select 
                            v-model="segment.axis"
                            :items="axes"
                            :hint="`${axis.title}, ${axis.hint}`"
                        />
                        <v-slider
                            v-model="segment.length"
                            :min="0"
                            :max="50"
                            :step="1"
                            thumb-label
                            thumb-size="10"
                            show-ticks
                        />
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
</style>