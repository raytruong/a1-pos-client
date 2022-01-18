<template>
    <div class="px-4 py-4 text-md">
        <div class="flex flex-col items-end">
            <div class="font-extralight text-gray-400">Last Synced</div>
            <div class="flex">
                <div class="relative mr-4">
                    <div class="absolute inset-y-0 left-0 flex items-center">
                        <div
                            :class="isHealthy ? 'bg-green-400' : 'bg-red-400'"
                            class="h-2 w-2 rounded-lg"
                        ></div>
                    </div>
                </div>
                <div>{{ lastConnected }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const name = 'HealthIndicator.vue';
const isHealthy = ref(true);
const lastConnected = ref('3 mins ago');
</script>

<style scoped></style>
