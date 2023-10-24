<template>
    <VuePlotly :data="data" :layout="layout" :display-mode-bar="false" />
</template>

<script>
import { VuePlotly } from 'vue3-plotly'

export default {
    components: {
        VuePlotly
    },
    data: () => ({
        data: [],
        layout: {
            height: 700
        }
    }),
    mounted() {
        var a = [];
        var b = [];
        var c = [];
        for (var i = 0; i < 50; i++) {
            var a_ = Math.random();
            a.push(a_);

            var b_ = Math.random();
            b.push(b_);

            var c_ = Math.random();
            c.push(c_);
        }
        this.data = [
            {
                opacity: 0.8,
                color: 'rgb(300,100,200)',
                type: 'mesh3d',
                x: a,
                y: b,
                z: c,
            }
        ];
    }
}
</script>

<style>
.main-svg {
    border-radius: 8px;
}
</style>
