import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('app', {
  state: () => ({
    dark: true,
    active_tab: 0
  }),
  getters : {
  },
  actions : {
    toggleTheme() {
      this.dark = !this.dark;
    },
    setActiveTab(id) {
      this.active_tab = id;
    }
  }
})
