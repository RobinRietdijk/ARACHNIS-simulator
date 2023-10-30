<template>
  <VuePlotly
    :data="plots[active].getPlot()"
    :layout="layout"
    :display-mode-bar="false"
  />
</template>

<script>
import { VuePlotly } from "vue3-plotly";
import { useAppStateStore } from "@/store/appState";
import { useInverseKinematicsStore } from "@/store/inverseKinematics";
import { useForwardKinematicsStore } from "@/store/forwardKinematics";
import { useLegPatternsStore } from "@/store/legPatterns";
import { useWalkingGaitsStore } from "@/store/walkingGaits";
import KinematicsPlot from "@/components/Geometry/KinematicsPlot"

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

    const inverseKinematicsPlot = new KinematicsPlot(inverseKinematics.id, inverseKinematics.segments, inverseKinematics.segment_length, "Inverse Kinematics");
    const forwardKinematicsPlot = new KinematicsPlot(forwardKinematics.id, forwardKinematics.segments, forwardKinematics.segment_length, "Forward Kinematics");
    //const legPatternsPlot = new Plot();
    //const walkingGaitsPlot = new Plot();
    const plots = {}
    plots[inverseKinematicsPlot.id] = inverseKinematicsPlot
    plots[forwardKinematicsPlot.id] = forwardKinematicsPlot
    let active = appState.active_tab;
    appState.$subscribe((mutation, state) => {
      active = state.active_tab;
    });
    
    inverseKinematics.$subscribe((mutation, state) => {
    });

    forwardKinematics.$subscribe((mutation, state) => {
    });

    legPatterns.$subscribe((mutation, state) => {
    });

    walkingGaits.$subscribe((mutation, state) => {
    });

    return {
      active,
      plots,
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
