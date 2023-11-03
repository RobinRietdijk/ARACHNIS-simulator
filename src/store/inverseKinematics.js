import Axis from '@/components/Geometry/Axis';
import { defineStore } from 'pinia'

export const useInverseKinematicsStore = defineStore('inverseKinematics', {
  state: () => ({
    id: 0,
    name: 'inverseKinematics',
    n_segments: 2,
    segments: [{
      id: 0,
      len: 10,
      axis: new Axis('x'),
      range: [0, 180]
    }, {
      id: 1,
      len: 10,
      axis: new Axis('x'),
      range: [0, 180]
    }],
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
            len: 10,
            axis: new Axis('x'),
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
