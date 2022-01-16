<template>
    <div
        :class="isHealthy ? 'bg-green-600' : 'bg-red-600'"
        class="flex rounded-md text-white px-3 py-2"
    >
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center">
                <svg
                    v-if="isHealthy"
                    class="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                    />
                </svg>
                <svg
                    v-else
                    class="h-6 w-6 text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                >
                    <path d="M0 0h24v24H0z" stroke="none" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" x2="9.01" y1="10" y2="10" />
                    <line x1="15" x2="15.01" y1="10" y2="10" />
                    <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
                </svg>
            </div>
            <span v-if="isHealthy" class="ml-7">Online</span>
            <span v-else class="ml-7">Offline</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'HealthIndicator.vue',
    setup(props, context) {
        const isHealthy = ref(true);
        return {
            isHealthy,
        };
    },
});
</script>

<style scoped></style>
