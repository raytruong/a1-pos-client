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
                        v-model="selectedCategory"
                        :buttons="categoryButtons"
                        default-selected
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
                    <ItemGrid :itemPrototypes="currentGridItems"></ItemGrid>
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
                    <CheckoutSummary
                        :total-price="cart.totalPrice"
                    ></CheckoutSummary>
                </div>
            </div>
        </template>
    </TwoPanelLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Item from '@/lib/models/Item';
import TwoPanelLayout from '@/layouts/TwoPanelLayout.vue';
import HealthIndicator from '@/components/HealthIndicator.vue';
import RadioGroup from '@/components/shared/HorizontalRadioGroup.vue';
import ItemGrid from '@/components/ItemGrid.vue';
import ItemCart from '@/components/ItemCart.vue';
import DangerButton from '@/components/shared/buttons/DangerButton.vue';
import CheckoutSummary from '@/components/CheckoutSummary.vue';

import { usePrototypeStore } from '@/stores/prototypeStore';
import { useCartStore } from '@/stores/cartStore';

const cart = useCartStore();
const prototypes = usePrototypeStore();
prototypes.fetchPrototypes();

let selectedCategory = ref('');

const categoryButtons = computed(() => {
    return Array.from(prototypes.categories).map((category) => {
        return {
            text: category as string,
            val: category as string,
        };
    });
});

const currentGridItems = computed(() => {
    const filtered = prototypes.items.filter((item) => {
        return item.category === selectedCategory.value;
    });
    return filtered as Array<Item>;
});
</script>

<style scoped></style>
