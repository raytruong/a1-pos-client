<template>
    <div class="flex flex-col items-center">
        <CartItem
            v-for="item in getItems()"
            :key="item._id"
            :item="item"
        ></CartItem>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import CartItem from '@/components/CartItem.vue';
import Item from '@/lib/models/Item';
import Currency from '@/lib/models/Currency';
import Addon from '@/lib/models/Addon';

// const props = defineProps({});
// const emits = defineEmits([]);

const getItems = () => {
    let item = new Item(
        'item:1234567890',
        '7-8596f70bd9ed85a3e133af283838f191',
        'Classic Pedicure',
        new Currency(1025),
        1,
        'Pedicure',
        new Array<Addon>(),
    );

    const items = [];
    for (let i = 0; i < 24; i++) {
        items.push(item);
    }
    return items;
};
</script>

<style scoped></style>
