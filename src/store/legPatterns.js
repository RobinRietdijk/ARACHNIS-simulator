import { defineStore } from 'pinia'

export const useLegPatternsStore = defineStore('legPatterns', {
  state: () => ({
    id: 2,
    name: 'legPatterns',
    segments: 2,
    segment_length: 10,
  }),
  getters : {
  },
  actions : {
  }
})
