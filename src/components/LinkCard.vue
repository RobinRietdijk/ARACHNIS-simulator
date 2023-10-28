<template>
    <v-container class="pt-0 pl-2">
        <v-row class="flex-nowrap">
            <v-col class="link-btn pr-1">
                <v-btn density="comfortable" icon="mdi-theme-light-dark" color="primary" @click="appState.toggleTheme()" />
            </v-col>
            <v-col class="link-btn">
                <v-btn density="comfortable" icon="mdi-home" color="primary" />
            </v-col>
            <v-divider vertical inset />
            <v-col v-for="link in links" :key="link.id" class="link-btn pr-1">
                <v-btn density="comfortable" :icon="link.icon" :active="appState.active_tab === link.id" color="secondary"
                    @click="appState.setActiveTab(link.id)" />
            </v-col>
            <v-col />
        </v-row>
    </v-container>
</template>

<script>
import { useAppStateStore } from '@/store/appState';
export default {
    data: () => ({
        links: [
            {
                id: 0,
                name: "inverseKinematics",
                icon: "mdi-undo",
            },
            {
                id: 1,
                name: "forwardKinematics",
                icon: "mdi-redo",
            },
            {
                id: 2,
                name: "legPatterns",
                icon: "mdi-lock-pattern",
            },
            {
                id: 3,
                name: "walkingGaits",
                icon: "mdi-play",
            },
        ]
    }),
    setup() {
        const appState = useAppStateStore();
        return {
            appState
        }
    }
}
</script>

<style scoped>
.link-btn {
    flex: 0 0 0
}
</style>