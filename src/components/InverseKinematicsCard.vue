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
                        >
                            <template v-slot:prepend>
                                <v-btn
                                    size="small"
                                    variant="text"
                                    icon="mdi-minus"
                                    :disabled="n_segments <= min_segments"
                                    @click="decrement_segments"
                                ></v-btn>
                                </template>

                                <template v-slot:append>
                                <v-btn
                                    size="small"
                                    variant="text"
                                    icon="mdi-plus"
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
                                :disabled="onboarding < 1"
                                variant="plain"
                                icon="mdi-chevron-left"
                                @click="onboarding--"
                            ></v-btn>
                            <v-card-title>Segment: {{ onboarding + 1 }}</v-card-title>
                            <v-btn
                                :disabled="onboarding >= n_segments - 1"
                                variant="plain"
                                icon="mdi-chevron-right"
                                @click="onboarding++"
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
                                    <v-card-text>
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
                                                <v-text-field v-model="segment.color" hide-details class="ma-0 pa-0" solo>
                                                    <template v-slot:append>
                                                        <div :style="swatchStyle(segment.id)">
                                                            <v-menu activator="parent" v-model="segment_options[segment.id].color_menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                                                                <v-color-picker v-model="segment.color" flat show-swatches />
                                                            </v-menu>
                                                        </div>
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <round-slider 
                                                    ref="rslider"
                                                    v-model="segment.range"
                                                    sliderType="range"
                                                    min="0"
                                                    max="360"
                                                    step="1"
                                                    radius="75"
                                                    width="8"
                                                    handleSize="24"
                                                    borderWidth="0"
                                                    lineCap="round"
                                                    :rangeColor="$vuetify.theme.current.colors.primary"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
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
import { createDefaultSegment, createDefaultSegmentOptions } from '@/components/Geometry/defaultSegment'
import RoundSlider from 'vue-three-round-slider'
import Axis from '@/components/Geometry/Axis';
import _ from 'lodash';

export default {
    components: {
        RoundSlider,
    },
    data: () => ({
        onboarding: 0,
        min_segments: 1,
        max_segments: 10,
        n_segments: 0,
        segments: [],
        segment_options: []
    }),
    methods: {
        updateSegments(v) {
            const old = this.segments.length;
            if (old < v) {
                for (let i = 0; i < v - old; i++) {
                    this.segments.push(createDefaultSegment(old + i))
                    this.segment_options.push(createDefaultSegmentOptions())
                }
            } else if (old > v) {
                for (let i = 0; i < old - v; i++) {
                this.segments.pop()
                this.segment_options.pop()
                }
            }
            this.n_segments = v;
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
        },

        swatchStyle(id) {
            const color = this.segments[id].color;
            const menu = this.segment_options[id].color_menu;
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out'
            }
        },
    },
    mounted() {
        this.n_segments = _.clone(this.inverseKinematics.n_segments)
        this.segments = _.cloneDeep(this.inverseKinematics.segments)
        for (const segment of this.segments) {
            this.segment_options[segment.id] = createDefaultSegmentOptions()
        }
    },
    setup() {
        const inverseKinematics = useInverseKinematicsStore();
        return {
            inverseKinematics
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