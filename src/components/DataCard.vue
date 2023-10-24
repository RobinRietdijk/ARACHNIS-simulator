<template>
    <v-card>
        <v-card-text class="h-100">
            <v-row class="ma-0 fill-height">
                <v-col class="d-flex flex-column">
                    <v-row>‎</v-row>
                    <v-row align-content="center" class="text-overline">Alpha</v-row>
                    <v-row align-content="center" class="text-overline">Beta</v-row>
                    <v-row align-content="center" class="text-overline">Gamma</v-row>
                </v-col>
                <v-col
                    class="data-col d-flex flex-column"
                    v-for="leg in legs"
                    :key="leg.name"
                >
                    <v-row align-content="center" class="text-caption"><b>{{ leg.name }}</b></v-row>
                    <v-row align-content="center" class="text-overline"> {{ leg.alpha }}</v-row>
                    <v-row align-content="center" class="text-overline">{{ leg.beta }}</v-row>
                    <v-row align-content="center" class="text-overline">{{ leg.gamma }}</v-row>
                </v-col>
            </v-row>
        </v-card-text>  
    </v-card>
</template>

<script>
export default {
    data: () => ({
        legs: [
            {
                name: "FLeft",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            {
                name: "FRight",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            {
                name: "MFLeft",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            {
                name: "MFRight",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            {
                name: "MBLeft",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            {
                name: "MBRight",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            {
                name: "BLeft",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
            {
                name: "BRight",
                alpha: 0,
                beta: 0,
                gamma: 0
            },
        ]
    })
}
</script>

<style scoped>
</style>