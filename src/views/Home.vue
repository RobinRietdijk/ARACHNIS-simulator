<template>
    <v-container fluid>
        <v-row>
            <v-col cols="4">
                <LinkCard @setActive="changeActive" />
                <DimensionCard class="mb-4" />
                <InverseKinematicsCard v-if="this.active === 'inverseKinematics'"/>
                <ForwardKinematicsCard v-if="this.active === 'forwardKinematics'"/>
                <LegPatternsCard v-if="this.active === 'legPatterns'"/>
                <WalkingGaitsCard v-if="this.active === 'walkingGaits'"/>
            </v-col>

            <v-col cols="8">
                <PlotlyContainer />
            </v-col>
        </v-row>
        <v-row>

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
