<template>
    <div class="grid grid-rows-12 h-full bg-gray-200 py-4">
        <div
            class="
                row-span-11
                flex flex-col
                items-center
                p-2
                gap-8
                overflow-y-scroll
                no-scrollbar
            "
        >
            <IconButton
                v-for="app in apps"
                :key="app.view"
                :active="app.view === activeView"
                class="min-w-fit min-h-fit"
                @click="onClick(app.view)"
            >
                <component
                    :is="app.icon"
                    class="h-8 w-8 text-white"
                ></component>
            </IconButton>
        </div>
        <div class="row-span-1 flex flex-col items-center p-4 gap-8">
            <DangerButton>
                <LogoutIcon class="h-8 w-8 text-white"></LogoutIcon>
            </DangerButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconButton from '@/components/shared/buttons/IconButton.vue';
import {
    IdentificationIcon,
    ShoppingCartIcon,
    CogIcon,
    ChartSquareBarIcon,
    LogoutIcon,
    DocumentTextIcon,
} from '@heroicons/vue/solid';
import DangerButton from '@/components/shared/buttons/DangerButton.vue';

let activeView = ref('store');

const apps = [
    {
        view: 'store',
        icon: ShoppingCartIcon,
    },
    {
        view: 'profile',
        icon: IdentificationIcon,
    },
    {
        view: 'transactions',
        icon: DocumentTextIcon,
    },
    {
        view: 'dashboard',
        icon: ChartSquareBarIcon,
    },
    {
        view: 'settings',
        icon: CogIcon,
    },
];

const onClick = (value: string): void => {
    activeView.value = value;
};
</script>

<style scoped></style>
