<template>
  <VuePlotly
    :data="[]"
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
    return {
      appState,
      inverseKinematics,
      forwardKinematics,
      legPatterns,
      walkingGaits,
    }
  }
};
</script>

<style>
.main-svg {
  border-radius: 8px;
}
</style>
