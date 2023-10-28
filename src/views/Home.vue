<template>
    <v-container fluid class="d-flex flex-column h-100">
        <v-row class="flex-grow-0">
            <v-col cols="4" class="d-flex flex-column">
                <v-row class="pa-0 ma-0 w-100 pt-3 flex-grow-0"><LinkCard width="100%" /></v-row>
                <v-row class="pa-0 ma-0 w-100">
                    <InverseKinematicsCard width="100%" v-if="appState.active_tab === inverseKinematics.id"/>
                    <ForwardKinematicsCard width="100%" v-if="appState.active_tab === forwardKinematics.id"/>
                    <LegPatternsCard width="100%" v-if="appState.active_tab === legPatterns.id"/>
                    <WalkingGaitsCard width="100%" v-if="appState.active_tab === walkingGaits.id"/>
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
import LinkCard from "@/components/LinkCard.vue"
import InverseKinematicsCard from '@/components/InverseKinematicsCard.vue'
import ForwardKinematicsCard from '@/components/ForwardKinematicsCard.vue'
import LegPatternsCard from '@/components/LegPatternsCard.vue'
import WalkingGaitsCard from '@/components/WalkingGaitsCard.vue'
import PlotlyContainer from '@/components/PlotlyContainer.vue'
import DataCard from "@/components/DataCard.vue"
import { useAppStateStore } from "@/store/appState"
import { useInverseKinematicsStore } from "@/store/inverseKinematics"
import { useForwardKinematicsStore } from "@/store/forwardKinematics"
import { useLegPatternsStore } from "@/store/legPatterns"
import { useWalkingGaitsStore } from "@/store/walkingGaits"

const appState = useAppStateStore();
const inverseKinematics = useInverseKinematicsStore()
const forwardKinematics = useForwardKinematicsStore()
const legPatterns = useLegPatternsStore()
const walkingGaits = useWalkingGaitsStore()
</script>
