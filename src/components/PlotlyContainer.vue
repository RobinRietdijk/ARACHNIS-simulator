<template>
  <VuePlotly
    :data="[polygon.get3DMesh(), polygon.get3DScatter()]"
    :layout="layout"
    :display-mode-bar="false"
  />
</template>

<script>
import { VuePlotly } from "vue3-plotly";
import Polygon from "./Geometry/Polygon";

export default {
  components: {
    VuePlotly,
  },
  data: () => ({
    polygon: new Polygon(10, 100, 100),
    layout: {
      height: 700,
    },
  }),
};
</script>

<style>
.main-svg {
  border-radius: 8px;
}
</style>
