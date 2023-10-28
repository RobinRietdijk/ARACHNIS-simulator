import { defineStore } from 'pinia'

export const useInverseKinematicsStore = defineStore('inverseKinematics', {
  state: () => ({
    id: 0,
    name: 'inverseKinematics',
    segments: 2,
    segment_length: 10,
  }),
  getters : {
  },
  actions : {
  }
})
