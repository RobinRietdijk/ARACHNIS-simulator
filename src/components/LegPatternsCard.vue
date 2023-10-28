<template>
    <v-card>
        <v-card-title>
            <v-container class="pa-2">
                <v-row class="py-1">
                    <v-col class="pa-0">LEG POSITIONS</v-col>
                    <v-col class="pa-0 reset-btn" justify-end>
                        <v-btn variant="plain" size="small" color="error">
                            RESET
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>

                </v-row>
            </v-container>
        </v-card-title>
        <v-card-text class="pb-0">
            <v-container>
                
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { useLegPatternsStore } from '@/store/legPatterns';
export default {
    setup() {
        const legPatterns = useLegPatternsStore()
        return {
            legPatterns
        }
    }
}
</script>

<style scoped>
.reset-btn {
    flex: 0 0 1px;
}

.slider-caption {
    opacity: 0.7;
}
</style>