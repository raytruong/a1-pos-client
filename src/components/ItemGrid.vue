<template>
    <div class="grid grow grid-rows-4 grid-cols-4 gap-x-10 gap-y-10 m-4">
        <ItemCard
            v-for="item in itemPrototypes"
            :key="item._id"
            :item="item"
        ></ItemCard>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import ItemCard from '@/components/ItemCard.vue';
import Item from '@/lib/models/Item';

const props = defineProps({
    itemPrototypes: {
        type: Array as PropType<Array<Item>>,
        required: true,
    },
});
</script>

<style scoped></style>
