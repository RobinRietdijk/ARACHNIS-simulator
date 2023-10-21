<template>
    <v-container class="pt-0 pl-2">
        <v-row class="flex-nowrap">
            <v-col class="link-btn">
                <v-btn 
                    density="comfortable"
                    icon="mdi-home"
                    color="primary"
                />
            </v-col>
            <v-divider vertical inset />
            <v-col
                v-for="link in links"
                :key="link.name"
                class="link-btn pr-1"
            >
                <v-btn
                    density="comfortable"
                    :icon="link.icon"
                    color="secondary"
                />
            </v-col>
            <v-col />
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        links: [
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

<style scoped>
.link-btn {
    flex: 0 0 0
}
</style>