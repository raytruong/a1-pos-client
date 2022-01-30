<template>
    <div
        class="
            flex flex-grow
            justify-center
            min-h-fit min-w-fit
            rounded-2xl
            bg-gray-50
            outline outline-1 outline-gray-300
            p-4
        "
    >
        <div class="flex-col p-2">
            <div class="overflow-ellipsis">
                <div class="gap-4 flex justify-between">
                    <h1 class="text-black text-lg truncate">
                        {{ item.name }}
                    </h1>
                    <h1 class="text-orange-500 text-lg truncate">
                        {{ item.displaySinglePrice }}
                    </h1>
                </div>
                <p class="text-gray-500 font-light truncate">
                    {{ item.category }}
                </p>
            </div>
            <div class="mt-4 flex justify-center">
                <BlockButton @click="onClick"> Add to Cart </BlockButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';
import BlockButton from '@/components/shared/buttons/BlockButton.vue';

const props = defineProps({
    item: {
        type: Object as PropType<Item> | PropType<Addon>,
        required: true,
    },
});
const emits = defineEmits(['onAddToCart']);

const onClick = () => {
    emits('onAddToCart', props.item);
};
</script>

<style scoped></style>
