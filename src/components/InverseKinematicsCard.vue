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
                        <div class="text-caption pl-4">Number of segments: <span>{{ kinematics.n_segments }}</span></div>
                        <v-slider 
                            v-model="kinematics.n_segments"
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
                                    :disabled="kinematics.n_segments <= min_segments"
                                    @click="decrement_segments"
                                ></v-btn>
                                </template>

                                <template v-slot:append>
                                <v-btn
                                    size="small"
                                    variant="text"
                                    icon="mdi-plus"
                                    :disabled="kinematics.n_segments >= max_segments"
                                    @click="increment_segments"
                                ></v-btn>
                            </template>
                        </v-slider>
                    </v-col>
                </v-row>
                <v-divider />
                <v-spacer></v-spacer>
                <v-row class="flex-grow-0 pa-3">
                    <v-card class="w-100" flat :border=true>
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
                                        <v-row class="ml-0">
                                            <v-col>
                                                <v-row>
                                                    <div class="h-100 w-100 pt-4">
                                                        <div class="text-caption">
                                                            Length: {{ segment.len }}
                                                        </div>
                                                        <v-slider
                                                            v-model="segment.len"
                                                            class="mw-250"
                                                            :min="0"
                                                            :max="50"
                                                            :step="1"
                                                            thumb-label
                                                            thumb-size="10"
                                                        />
                                                    </div>
                                                </v-row>
                                                <v-row>
                                                    <v-text-field 
                                                        label="Color"
                                                        v-model="segment.color" 
                                                        class="ma-0 pa-0 mw-175" 
                                                        variant="outlined" 
                                                        hide-details
                                                        readonly
                                                        flat
                                                    >
                                                        <template v-slot:append-inner>
                                                            <div :style="swatchStyle(segment.id)">
                                                                <v-menu activator="parent" v-model="segment_options[segment.id].color_menu" location="top" offset="-148 15" :close-on-content-click="false">
                                                                    <div><v-color-picker v-model="segment.color" flat /></div>
                                                                </v-menu>
                                                            </div>
                                                        </template>
                                                    </v-text-field>
                                                </v-row>
                                            </v-col>
                                            <v-col>
                                                <v-row>
                                                    <div class="rs-container"><v-range-slider /></div>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions class="px-4">
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
import { storeToRefs } from 'pinia';
import Axis from '@/components/Geometry/Axis'

export default {
    setup() {
        const inverseKinematics = useInverseKinematicsStore();
        const { kinematics } = storeToRefs(inverseKinematics)
        return {
            kinematics
        };
    },
    data: () => ({
        onboarding: 0,
        min_segments: 1,
        max_segments: 10,
        n_segments: 0,
        segments: [],
        segment_options: []
    }),
    mounted() {
        this.n_segments = this.kinematics.n_segments
        this.segments = this.kinematics.linkage
        for (const segment of this.segments) {
            this.segment_options[segment.id] = createDefaultSegmentOptions()
        }
    },
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
            this.kinematics.n_segments = v;
        },

        increment_segments() {
            this.kinematics.n_segments++;
            this.updateSegments(this.kinematics.n_segments);
        },

        decrement_segments() {
            this.kinematics.n_segments--;
            this.updateSegments(this.kinematics.n_segments);
        },

        setAxis(i, a) {
            this.segments[i].axis = new Axis(a);
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

.mw-175 {
    max-width: 175px;
}

.mw-250 {
    max-width: 250px;
}

.mb--56 {
    margin-bottom: -56px;
}
</style>