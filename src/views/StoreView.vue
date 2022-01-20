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
                    <h1 class="text-4xl">A1 Nails Salon</h1>
                    <HealthIndicator />
                </div>
                <div class="row-span-1"></div>
                <div class="row-span-8">
                    <div>Paginated viewport</div>
                </div>
                <div class="row-span-2 px-8 flex items-center">
                    <div
                        class="
                            px-4
                            py-4
                            mb-4
                            flex flex-grow
                            justify-between
                            rounded-xl
                            shadow-lg
                        "
                    >
                        <UserPanel />
                        <div class="bg-gray-100 w-0.5"></div>
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
                    <hr2 class="text-3xl font-medium text-gray-900"
                        >Current Order</hr2
                    >
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
import TwoPanelLayout from '@/layouts/TwoPanelLayout.vue';
import UserPanel from '@/components/UserPanel.vue';
import HealthIndicator from '@/components/HealthIndicator.vue';

const name = 'StoreView';
</script>

<style scoped></style>
