<template>
    <router-view />
</template>

<script setup>
import { useTheme } from 'vuetify';
import { useAppStateStore } from './store/appState';

const appState = useAppStateStore();
const theme = useTheme();

appState.$subscribe((mutation, state) => {
  theme.global.name.value = state.dark ? 'dark' : 'light'
})
</script>

<style>
html {
    overflow: hidden;
}
</style>
