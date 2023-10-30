// Utilities
import { defineStore } from 'pinia'

export const usePlotStore = defineStore('plot', {
  state: () => ({
    dimensions: {
      edgeLength: 100,
      coxiaLength: 100,
      femurLength: 100,
      tibiaLength: 100,
      bodyHeight: 100,
      xScale: 1,
      yScale: 1,
    },

  }),
  getters: {

  },
  actions: {

  }
})
