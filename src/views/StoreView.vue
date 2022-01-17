<template>
    <TwoPanelLayout>
        <template v-slot:leftPanel>
            <div class="grid h-screen grid-rows-12 grid-cols-1">
                <div class="row-span-1 bg-gray-500">
                    <div>Top bar</div>
                </div>
                <div class="row-span-1 bg-white">
                    <div>Category selection</div>
                </div>
                <div class="row-span-8 bg-gray-500">
                    <div>Paginated viewport</div>
                </div>
                <div class="row-span-2 bg-white">
                    <UserPanel></UserPanel>
                </div>
            </div>
        </template>
        <template v-slot:rightPanel>
            <div class="grid h-screen grid-rows-12 grid-cols-1">
                <div class="row-span-1 bg-white">
                    <div>Cart, clear all</div>
                </div>
                <div class="row-span-8 bg-gray-500">
                    <div>Cart viewport</div>
                </div>
                <div class="row-span-1 bg-white">
                    <div>Cash/Credit Radio Group</div>
                </div>
                <div class="row-span-2 bg-gray-500">
                    <div>Confirmation Area</div>
                </div>
            </div>
        </template>
    </TwoPanelLayout>
</template>

<script>
import TwoPanelLayout from '@/layouts/TwoPanelLayout.vue';

import UserPanel from '@/components/UserPanel.vue';

export default {
    name: 'StoreView',
    components: {
        TwoPanelLayout,
        UserPanel,
    },
};
</script>

<style scoped></style>
