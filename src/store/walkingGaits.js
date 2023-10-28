import { defineStore } from 'pinia'

export const useWalkingGaitsStore = defineStore('walkingGaits', {
  state: () => ({
    id: 3,
    name: 'walkingGaits',
    segments: 2,
    segment_length: 10,
  }),
  getters : {
  },
  actions : {
  }
})
