import Kinematics from '@/components/Geometry/Kinematics';
import { defineStore } from 'pinia'

export const useInverseKinematicsStore = defineStore('inverseKinematics', {
  state: () => ({
    id: 0,
    name: 'inverseKinematics',
    kinematics: new Kinematics(0, 2),
  }),
  getters : {
  },
  actions : {
    
  }
})
