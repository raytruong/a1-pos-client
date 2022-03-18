<template>
    <div class="flex flex-col items-center">
        <CartItem v-for="item in items" :key="item._id" :item="item"></CartItem>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import CartItem from '@/components/CartItem.vue';

import Item from '@/lib/models/Item';

const props = defineProps({
    items: {
        type: Array as PropType<Array<Item>>,
        required: true,
    },
});

// const props = defineProps({});
// const emits = defineEmits([]);
</script>

<style scoped></style>
