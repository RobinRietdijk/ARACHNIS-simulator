<template>
    <v-container class="pt-0 pl-2">
        <v-row class="flex-nowrap">
            <v-col class="link-btn pr-1">
                <v-btn density="comfortable" icon="mdi-theme-light-dark" color="primary" @click="switchTheme" />
            </v-col>
            <v-col class="link-btn">
                <v-btn density="comfortable" icon="mdi-home" color="primary" />
            </v-col>
            <v-divider vertical inset />
            <v-col v-for="link in links" :key="link.name" class="link-btn pr-1">
                <v-btn density="comfortable" :icon="link.icon" :active="this.active === link.name" color="secondary"
                    @click="setActive(link)" />
            </v-col>
            <v-col />
        </v-row>
    </v-container>
</template>

<script>
import { useTheme } from 'vuetify';
export default {
    data: () => ({
        active: "",
        links: [
            {
                name: "inverseKinematics",
                icon: "mdi-undo",
            },
            {
                name: "forwardKinematics",
                icon: "mdi-redo",
            },
            {
                name: "legPatterns",
                icon: "mdi-lock-pattern",
            },
            {
                name: "walkingGaits",
                icon: "mdi-play",
            },
        ]
    }),
    methods: {
        setActive(o) {
            this.active = o.name
            this.$emit('setActive', o.name)
        },
        switchTheme() {
            this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark'
        }
    },
    mounted() {
        this.active = this.links[0].name
        this.$emit('setActive', this.active)
    },
    setup() {
        const theme = useTheme()
        return {
            theme
        }
    }
}
</script>

<style scoped>
.link-btn {
    flex: 0 0 0
}
</style>