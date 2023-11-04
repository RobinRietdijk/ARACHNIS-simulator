import { createDefaultSegment } from '@/components/Geometry/defaultSegment';
import { defineStore } from 'pinia'

export const useInverseKinematicsStore = defineStore('inverseKinematics', {
  state: () => ({
    id: 0,
    name: 'inverseKinematics',
    n_segments: 2,
    segments: [createDefaultSegment(0), createDefaultSegment(1)],
  }),
  getters : {
  },
  actions : {
    set_n_segments(v) {
      const old = this.segments.length;
      if (old < v) {
        for (let i = 0; i < v - old; i++) {
          this.segments.push(createDefaultSegment(old + i))
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
