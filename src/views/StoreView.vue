<template>
    <TwoPanelLayout>
        <template #leftPanel>
            <div
                class="
                    grid grid-rows-12 grid-cols-1
                    h-screen
                    bg-gray-50
                    px-4
                    py-6
                "
            >
                <div class="px-8 row-span-1 flex justify-between items-center">
                    <h1 class="text-4xl">Raymond Truong</h1>
                    <HealthIndicator />
                </div>
                <div class="row-span-1 flex items-center px-10">
                    <RadioGroup
                        v-model="selected"
                        :buttons="getButtons()"
                        defaultSelected
                    >
                    </RadioGroup>
                </div>
                <div
                    class="
                        row-span-10
                        px-6
                        overflow-y-scroll overflow-x-hidden
                        no-scrollbar
                    "
                >
                    <ItemGrid></ItemGrid>
                </div>
            </div>
        </template>
        <template #rightPanel>
            <div
                class="
                    grid
                    h-screen
                    grid-rows-12 grid-cols-1
                    bg-gray-50
                    py-6
                    border
                "
            >
                <div
                    class="
                        row-span-1
                        flex
                        justify-between
                        items-center
                        border-b
                        p-4
                    "
                >
                    <h2 class="text-3xl font-medium text-gray-900">
                        Current Order
                    </h2>
                    <DangerButton>Clear All</DangerButton>
                </div>
                <div
                    class="
                        row-span-8
                        overflow-y-scroll overflow-x-hidden
                        no-scrollbar
                    "
                >
                    <ItemCart></ItemCart>
                </div>
                <div class="row-span-3 border-t">
                    <CheckoutSummary></CheckoutSummary>
                </div>
            </div>
        </template>
    </TwoPanelLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TwoPanelLayout from '@/layouts/TwoPanelLayout.vue';
import HealthIndicator from '@/components/HealthIndicator.vue';
import RadioGroup from '@/components/shared/HorizontalRadioGroup.vue';
import ItemGrid from '@/components/ItemGrid.vue';
import ItemCart from '@/components/ItemCart.vue';
import DangerButton from '@/components/shared/buttons/DangerButton.vue';
import CheckoutSummary from '@/components/CheckoutSummary.vue';

import { usePrototypeStore } from '@/stores/prototypeStore';

const prototypes = usePrototypeStore();

prototypes.fetchPrototypes();

let selected = ref('');

const getButtons = () => {
    return [
        {
            text: 'Full Set',
            val: 'full-set',
        },
        {
            text: 'Fill In',
            val: 'fill-in',
        },
        {
            text: 'Pedicure',
            val: 'pedicure',
        },
        {
            text: 'Manicure',
            val: 'manicure',
        },
        {
            text: 'Polish Change',
            val: 'polish-change',
        },
        {
            text: 'Kids',
            val: 'kids',
        },
    ];
};
</script>

<style scoped></style>
