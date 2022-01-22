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
                    <h1 class="text-4xl">A1 Nails Salon</h1>
                    <HealthIndicator />
                </div>
                <div class="row-span-1 flex items-center px-3">
                    <RadioGroup
                        v-model="selected"
                        :buttons="getButtons()"
                    ></RadioGroup>
                </div>
                <div class="row-span-8 flex items-center px-6">
                    <ItemGrid></ItemGrid>
                </div>
                <div class="row-span-2 px-6 flex items-center">
                    <StoreDock></StoreDock>
                </div>
            </div>
        </template>
        <template #rightPanel>
            <div
                class="
                    grid
                    h-screen
                    grid-rows-12 grid-cols-1
                    bg-gray-100
                    shadow-inner
                    px-4
                    py-6
                "
            >
                <div class="row-span-1 flex justify-between items-center p-4">
                    <h2 class="text-3xl font-medium text-gray-900">
                        Current Order
                    </h2>
                    <button
                        class="
                            block
                            rounded-xl
                            bg-red-400
                            text-white text-md
                            shadow-sm
                            px-5
                            py-2
                            font-body
                        "
                    >
                        Clear All
                    </button>
                </div>
                <div class="row-span-8">
                    <div>Cart viewport</div>
                </div>
                <div class="row-span-1">
                    <div>Cash/Credit Radio Group</div>
                </div>
                <div class="row-span-2">
                    <div>Confirmation Area</div>
                </div>
            </div>
        </template>
    </TwoPanelLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TwoPanelLayout from '@/layouts/TwoPanelLayout.vue';
import HealthIndicator from '@/components/HealthIndicator.vue';
import RadioGroup from '@/components/shared/RadioGroup.vue';
import ItemGrid from '@/components/ItemGrid.vue';
import StoreDock from '@/components/StoreDock.vue';

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
