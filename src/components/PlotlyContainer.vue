<template>
  <VuePlotly :data="data" :layout="layout" :display-mode-bar="false" />
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
    data: [],
    layout: {
      height: 700,
    },
  }),
  watch: {
    'appState.active_tab': {
      handler: 'updatePlot',
      deep: true,
    },
    'inverseKinematics': {
      handler: 'updatePlot',
      deep: true,
    }
  },  
  mounted() {
    this.updatePlot()
  },
  methods: {
    updatePlot() {
      this.data = this.plots[this.appState.active_tab].getPlot();
    }
  },
  setup() {
    const appState = useAppStateStore();
    const inverseKinematics = useInverseKinematicsStore();
    const forwardKinematics = useForwardKinematicsStore();
    const legPatterns = useLegPatternsStore();
    const walkingGaits = useWalkingGaitsStore();

    const inverseKinematicsPlot = new KinematicsPlot(inverseKinematics.id, inverseKinematics.n_segments);
    const forwardKinematicsPlot = new KinematicsPlot(forwardKinematics.id, forwardKinematics.n_segments);
    //const legPatternsPlot = new Plot();
    //const walkingGaitsPlot = new Plot();

    const plots = {};
    plots[inverseKinematicsPlot.id] = inverseKinematicsPlot;
    plots[forwardKinematicsPlot.id] = forwardKinematicsPlot;

    inverseKinematics.$subscribe((mutation, state) => {
      const target = mutation.events.target.id
      switch (mutation.events.key) {
        case "axis":
          inverseKinematicsPlot.setSegmentAxis(target, state.segments[target].axis);
          break;
        case "len":
          inverseKinematicsPlot.setSegmentLength(target, state.segments[target].len);
          break;
        case "range":
          inverseKinematicsPlot.setSegmentMinAngle(target, state.segments[target].range[0]);
          inverseKinematicsPlot.setSegmentMaxAngle(target, state.segments[target].range[1]);
          break;
        case "color":
          inverseKinematicsPlot.setSegmentColor(target, state.segments[target].color);
          break;
        default:
          break;
      }
    });
    inverseKinematics.$onAction(
      ({
        name,
        store,
        args,
        after,
        onError,
      }) => {
        switch (name) {
          case "set_n_segments":
            inverseKinematicsPlot.setSegments(args[0]);
            break;
          default:
            break;
        }
      }
    )

    forwardKinematics.$subscribe((mutation, state) => {
    });

    legPatterns.$subscribe((mutation, state) => {
    });

    walkingGaits.$subscribe((mutation, state) => {
    });

    return {
      appState,
      plots,
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
