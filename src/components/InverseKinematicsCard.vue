<template>
    <v-card class="d-flex flex-column">
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
        <v-card-text class="pb-0 px-0 d-flex">
            <v-container class="d-flex flex-column">
                <v-row class="flex-grow-0">
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
                <v-spacer></v-spacer>
                <v-row class="flex-grow-0 pa-3">
                    <v-card class="w-100">
                        <v-card-actions class="justify-space-between">
                            <v-btn
                                variant="plain"
                                icon="mdi-chevron-left"
                                @click="windowPrev"
                            ></v-btn>
                            <v-item-group
                                v-model="onboarding"
                                class="text-center"
                                mandatory
                            >
                                <v-item
                                v-for="n in n_segments"
                                :key="`btn-${n}`"
                                v-slot="{ isSelected, toggle }"
                                :value="n - 1"
                                >
                                <v-btn
                                    :variant="isSelected ? 'outlined' : 'text'"
                                    icon="mdi-record"
                                    @click="toggle"
                                    size="small"
                                ></v-btn>
                                </v-item>
                            </v-item-group>
                            <v-btn
                                variant="plain"
                                icon="mdi-chevron-right"
                                @click="windowNext"
                            ></v-btn>
                        </v-card-actions>
                        <v-window
                            v-model="onboarding"
                        >
                            <v-window-item 
                                v-for="segment in segments"
                                :key="segment"
                            >
                                <v-card>
                                    <v-card-title cols="1">
                                        <div>Segment: {{ segment.id + 1 }}:</div>
                                    </v-card-title>
                                    <v-text>
                                        <v-row>
                                            <v-col class="pa-0">
                                                <v-slider
                                                    v-model="segment.len"
                                                    :min="0"
                                                    :max="50"
                                                    :step="1"
                                                    thumb-label
                                                    thumb-size="10"
                                                    show-ticks
                                                />
                                            </v-col>
                                            <round-slider 
                                                v-model="segment.range"
                                                sliderType="range"
                                                min="0"
                                                max="360"
                                                step="10"
                                                radius="75"
                                                width="8"
                                                handleSize="24"
                                                borderWidth="0"
                                                startAngle="130"
                                                endAngle="50"
                                                :rangeColor="$vuetify.theme.current.colors.primary"
                                            />
                                        </v-row>
                                    </v-text>
                                    <v-card-actions>
                                        <v-btn size="small" :color="segment.axis.name === 'x' ? 'primary' : undefined" :active="segment.axis.name === 'x'" variant="text" icon="mdi-axis-x-arrow" @click="setAxis(segment.id, 'x')"/>
                                        <v-btn size="small" :color="segment.axis.name === 'y' ? 'primary' : undefined" :active="segment.axis.name === 'y'" variant="text" icon="mdi-axis-y-arrow" @click="setAxis(segment.id, 'y')"/>
                                        <v-btn size="small" :color="segment.axis.name === 'z' ? 'primary' : undefined" :active="segment.axis.name === 'z'" variant="text" icon="mdi-axis-z-arrow" @click="setAxis(segment.id, 'z')"/>
                                    </v-card-actions>
                                </v-card>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { useInverseKinematicsStore } from '@/store/inverseKinematics';
import { storeToRefs } from 'pinia';
import RoundSlider from 'vue-three-round-slider'
import Axis from './Geometry/Axis';
export default {
    components: {
        RoundSlider,
    },
    data: () => ({
        onboarding: 1,
        min_segments: 1,
        max_segments: 10,
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
        },

        setAxis(i, a) {
            this.segments[i].axis = new Axis(a);
        },

        setRange(s) {
            console.log(s);
        },

        windowNext() {
            this.onboarding = this.onboarding + 1 >= this.n_segments ? 0 : this.onboarding + 1;
        },

        windowPrev() {
            this.onboarding = this.onboarding - 1 < 0 ? this.n_segments - 1 : this.onboarding - 1;
        }
    },
    setup() {
        const inverseKinematics = useInverseKinematicsStore();
        const { n_segments, segments } = storeToRefs(inverseKinematics);
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
.h-500 {
    height: 500px;
}
</style>