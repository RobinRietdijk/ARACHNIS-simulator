<template>
    <div class="crs-container" :style="getContainerStyling">
        
    </div>
</template>

<script>
export default {
    data: () => ({

    }),
    props: {
        min: {
            type: Number,
            default: 0.
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        value: {
            type: [Number, Array],
            default: null,
        },
        radius: {
            type: Number,
            default: 100
        },
    },
    methods: {
        getContainerStyling() {
            return {
                width: this.radius * 2,
                height: this.radius * 2
            }
        }
    },
    created: {
        
    }
}
</script>

<style scoped>
.crs-container {
    border-radius: 50%;
}
</style>