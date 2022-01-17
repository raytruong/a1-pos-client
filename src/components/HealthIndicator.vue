<template>
    <div
        class="
            px-4
            py-4
            text-xs
            rounded-lg
            bg-white
            shadow-md
            ring-1 ring-gray-900/5
        "
    >
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

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'HealthIndicator.vue',
    setup(props, context) {
        const isHealthy = ref(true);
        const lastConnected = ref('3 mins ago');
        return {
            isHealthy,
            lastConnected,
        };
    },
});
</script>

<style scoped></style>
