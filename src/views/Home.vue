<template>
    <v-container fluid class="d-flex flex-column h-100">
        <v-row class="flex-grow-0">
            <v-col cols="4" class="d-flex flex-column">
                <v-row class="pa-0 ma-0 w-100 pt-3 flex-grow-0"><LinkCard width="100%" @setActive="changeActive" /></v-row>
                <v-row class="pa-0 ma-0 w-100 flex-grow-0"><DimensionCard width="100%" class="mb-4" /></v-row>
                <v-row class="pa-0 ma-0 w-100">
                    <InverseKinematicsCard width="100%" v-if="this.active === 'inverseKinematics'"/>
                    <ForwardKinematicsCard width="100%" v-if="this.active === 'forwardKinematics'"/>
                    <LegPatternsCard width="100%" v-if="this.active === 'legPatterns'"/>
                    <WalkingGaitsCard width="100%" v-if="this.active === 'walkingGaits'"/>
                </v-row>
            </v-col>

            <v-col cols="8">
                <PlotlyContainer />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">

            </v-col>

            <v-col cols="8" class="d-flex flex-column">
                <v-row class="pa-0 ma-0 w-100"><DataCard width="100%" /></v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import DimensionCard from "@/components/DimensionCard.vue"
import LinkCard from "@/components/LinkCard.vue"
import InverseKinematicsCard from '@/components/InverseKinematicsCard.vue'
import ForwardKinematicsCard from '@/components/ForwardKinematicsCard.vue'
import LegPatternsCard from '@/components/LegPatternsCard.vue'
import WalkingGaitsCard from '@/components/WalkingGaitsCard.vue'
import PlotlyContainer from '@/components/PlotlyContainer.vue'
import DataCard from "@/components/DataCard.vue"
</script>

<script>
export default {
    data: () => ({
        active: ""
    }),
    methods: {
        changeActive(value) {
            this.active = value
        }
    }
}
</script>