<template>
    <v-container>
        <v-row class="flex-nowrap">
            <v-col
                v-for="link in links"
                :key="link.name"
            >
                <v-btn
                    density="comfortable"
                    :icon="link.icon"
                    color="purple"
                />
            </v-col>
            <v-col cols="5" />
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        links: [
            {
                name: "home",
                icon: "mdi-home",
                to: ""
            },
            {
                name: "inverse",
                icon: "mdi-undo",
                to: ""
            },
            {
                name: "forward",
                icon: "mdi-redo",
                to: ""
            },
            {
                name: "patterns",
                icon: "mdi-lock-pattern",
                to: ""
            },
            {
                name: "walking",
                icon: "mdi-play",
                to: ""
            },
        ]
    })
}
</script>
