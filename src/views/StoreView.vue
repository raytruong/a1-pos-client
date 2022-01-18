<template>
    <TwoPanelLayout>
        <template #leftPanel>
            <div class="grid grid-rows-12 grid-cols-1 h-screen bg-white">
                <div
                    class="
                        px-8
                        py-2
                        row-span-1
                        flex
                        justify-between
                        items-center
                        bg-white
                    "
                >
                    <span class="text-4xl">A1 Nails Salon</span>
                    <HealthIndicator />
                </div>
                <div class="row-span-1"></div>
                <div class="row-span-8">
                    <div>Paginated viewport</div>
                </div>
                <div class="row-span-2 px-8 flex justify-between items-center">
                    <div class="shadow-2xl p-4 rounded-xl flex-grow">
                        <UserPanel></UserPanel>
                    </div>
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
                "
            >
                <div class="row-span-1 flex justify-between items-center p-4">
                    <div class="text-4xl font-bold">Current Order</div>
                    <button
                        class="
                            block
                            rounded-xl
                            bg-red-400
                            text-white text-md
                            shadow-sm
                            px-5
                            py-2
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
import TwoPanelLayout from '@/layouts/TwoPanelLayout.vue';
import UserPanel from '@/components/UserPanel.vue';
import HealthIndicator from '@/components/HealthIndicator.vue';

const name = 'StoreView';
</script>

<style scoped></style>
