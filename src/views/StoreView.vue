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
                    <RadioGroup></RadioGroup>
                </div>
                <div class="row-span-8 flex items-center px-6">
                    <div
                        class="
                            grid
                            grow
                            grid-rows-3 grid-cols-5
                            gap-x-12 gap-y-8
                        "
                    >
                        <div
                            v-for="n in 15"
                            class="
                                flex-grow
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
                                            Gel Polish
                                        </h1>
                                        <h1
                                            class="
                                                text-orange-500 text-lg
                                                truncate
                                            "
                                        >
                                            $7.25
                                        </h1>
                                    </div>
                                    <p
                                        class="
                                            text-gray-500
                                            font-light
                                            truncate
                                        "
                                    >
                                        Full Set
                                    </p>
                                </div>
                                <div class="mt-4 flex justify-center">
                                    <button
                                        class="
                                            grow
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-blue-400
                                            to-sky-500
                                            text-white text-md
                                            shadow-sm
                                            px-3
                                            py-3
                                        "
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-span-2 px-6 flex items-center">
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
                        >Current Order
                    </hr2>
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
import RadioGroup from '@/components/shared/RadioGroup.vue';
</script>

<style scoped></style>
