import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('app', {
  state: () => ({
    theme: true,
    active_tab: 0
  }),
  getters : {
  },
  actions : {
    toggleTheme() {
      this.theme = !this.theme;
    },
    setActiveTab(id) {
      this.active_tab = id;
    }
  }
})
