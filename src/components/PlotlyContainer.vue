<template>
  <VuePlotly :data="plotData" :layout="layout" :display-mode-bar="false" />
</template>

<script>
import { VuePlotly } from "vue3-plotly";
import { useAppStateStore } from "@/store/appState";
import { useInverseKinematicsStore } from "@/store/inverseKinematics";
import { useForwardKinematicsStore } from "@/store/forwardKinematics";
import { useLegPatternsStore } from "@/store/legPatterns";
import { useWalkingGaitsStore } from "@/store/walkingGaits";
import KinematicsPlot from "@/components/Geometry/KinematicsPlot"
import Vector3D from './Geometry/Vector3D';

export default {
  components: {
    VuePlotly,
  },
  data: () => ({
    layout: {
      height: 700,
    },
  }),
  setup() {
    const appState = useAppStateStore();
    const inverseKinematics = useInverseKinematicsStore();
    const forwardKinematics = useForwardKinematicsStore();
    const legPatterns = useLegPatternsStore();
    const walkingGaits = useWalkingGaitsStore();

    const inverseKinematicsPlot = new KinematicsPlot(inverseKinematics.id, inverseKinematics.n_segments);
    //const forwardKinematicsPlot = new KinematicsPlot(forwardKinematics.id, forwardKinematics.segments, forwardKinematics.segment_length, "Forward Kinematics");
    //const legPatternsPlot = new Plot();
    //const walkingGaitsPlot = new Plot();

    const plots = {}
    plots[inverseKinematicsPlot.id] = inverseKinematicsPlot
    //plots[forwardKinematicsPlot.id] = forwardKinematicsPlot
    let active = appState.active_tab;
    appState.$subscribe((mutation, state) => {
      active = state.active_tab;
    });
    let plotData = plots[active].getPlot()

    inverseKinematics.$subscribe((mutation, state) => {
      const target = mutation.events.target.id
      switch (mutation.events.key) {
        case "n_segments":
          break;
        case "axis":
          inverseKinematicsPlot.setSegmentAxis(target, state.segments[target].axis);
          break;
        case "length":
          inverseKinematicsPlot.setSegmentLength(target, state.segments[target].length);
          break;
        case "range":
          inverseKinematicsPlot.setSegmentMinAngle(target, state.segments[target].range[0]);
          inverseKinematicsPlot.setSegmentMaxAngle(target, state.segments[target].range[1]);
          break;
        default:
          break;
      }

      if (active === inverseKinematicsPlot.id) {
        plotData = inverseKinematicsPlot.getPlot();
      }
    });

    forwardKinematics.$subscribe((mutation, state) => {
    });

    legPatterns.$subscribe((mutation, state) => {
    });

    walkingGaits.$subscribe((mutation, state) => {
    });

    return {
      active,
      plotData,
      appState,
      inverseKinematics,
      forwardKinematics,
      legPatterns,
      walkingGaits
    }
  }
};
</script>

<style>
.main-svg {
  border-radius: 8px;
}
</style>
