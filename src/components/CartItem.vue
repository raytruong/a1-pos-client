<template>
    <div class="flex relative w-full bg-gray-50 p-6 border-t">
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
            <div>
                <div class="flex justify-between">
                    <p class="text-gray-500 font-light truncate">
                        Dipping Powder x3
                    </p>
                    <p class="text-gray-500 font-light truncate">+$1.25</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-500 font-light truncate">
                        Gel Polish x2
                    </p>
                    <p class="text-gray-500 font-light truncate">+$1.25</p>
                </div>
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
