<template>
    <v-container fluid>
        <v-row>
            <v-col cols="4">
                <LinkCard />
                <DimensionCard />
            </v-col>

            <v-col cols="8">

            </v-col>
        </v-row>
        <v-row>

        </v-row>
    </v-container>
</template>

<script setup>
import DimensionCard from "@/components/DimensionCard.vue"
import LinkCard from "@/components/LinkCard.vue"
</script>
