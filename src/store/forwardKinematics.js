import { defineStore } from 'pinia'

export const useForwardKinematicsStore = defineStore('forwardKinematics', {
  state: () => ({
    id: 1,
    name: 'forwardKinematics',
    segments: 2,
    segment_length: 10,
  }),
  getters : {
  },
  actions : {
  }
})
