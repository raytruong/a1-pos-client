<template>
    <div
        class="
            flex
            w-full
            rounded-2xl
            bg-gray-50
            outline outline-1 outline-gray-300
            p-6
        "
    >
        <div class="flex flex-col w-full">
            <div class="flex justify-between truncate">
                <h1 class="text-black text-lg truncate">
                    {{ item.name }}
                </h1>
                <h1 class="text-orange-500 text-2xl min-w-fit">
                    {{ item.displaySinglePrice }}
                </h1>
            </div>
            <p class="text-gray-500 font-light truncate">{{ item.category }}</p>
            <div class="mt-4 flex justify-between">
                <div>Hi</div>
                <button
                    class="
                        rounded-xl
                        bg-red-400
                        text-white text-md
                        shadow-sm
                        px-3
                        py-3
                        focus:outline-none
                        focus:ring
                        focus:ring-offset-2
                        focus:ring-red-300
                    "
                >
                    <svg
                        class="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path
                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import Item from '@/lib/models/Item';

const props = defineProps({
    item: {
        type: Object as PropType<Item>,
        required: true,
    },
});
const emits = defineEmits([]);
</script>

<style scoped></style>
