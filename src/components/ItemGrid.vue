<template>
    <div class="grid grow grid-rows-3 grid-cols-5 gap-x-12 gap-y-8 m-4">
        <ItemCard :item="getItems()"></ItemCard>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import ItemCard from '@/components/ItemCard.vue';
import Item from '@/lib/models/Item';
import Currency from '@/lib/models/Currency';
import Addon from '@/lib/models/Addon';

// const props = defineProps({});
// const emits = defineEmits([]);

const getItems = () => {
    return new Item(
        'item:1234567890',
        '7-8596f70bd9ed85a3e133af283838f191',
        'Classic Pedicure',
        new Currency(100),
        1,
        'Pedicure',
        new Array<Addon>(),
    );
};
</script>

<style scoped></style>
