import Vector3D from '@/components/Geometry/Vector3D';
import { defineStore } from 'pinia'

export const useInverseKinematicsStore = defineStore('inverseKinematics', {
  state: () => ({
    id: 0,
    name: 'inverseKinematics',
    n_segments: 0,
    segments: [],
  }),
  getters : {
  },
  actions : {
    set_n_segments(v) {
      const old = this.segments.length;
      if (old < v) {
        for (let i = 0; i < v - old; i++) {
          this.segments.push({
            id: old + i,
            length: 10,
            axis: new Vector3D(1, 0, 0),
            range: [0, 180]
          })
        }
      } else if (old > v) {
        for (let i = 0; i < old - v; i++) {
          this.segments.pop()
        }
      }
      this.n_segments = v;
    }
  }
})
