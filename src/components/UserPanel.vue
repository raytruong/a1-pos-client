<template>
    <div class="flex">
        <div class="max-w-xs">
            <div class="mb-3 overflow-ellipsis">
                <div class="flex">
                    <div class="relative mr-7">
                        <div
                            class="absolute inset-y-0 left-0 flex items-center"
                        >
                            <svg
                                class="h-6 w-6 text-black"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <path d="M0 0h24v24H0z" stroke="none" />
                                <circle cx="12" cy="7" r="4" />
                                <path
                                    d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
                                />
                            </svg>
                        </div>
                    </div>
                    <p class="text-black text-lg truncate">Raymond Truong</p>
                </div>
            </div>
            <div class="flex justify-start gap-3">
                <BlockButton>Dashboard</BlockButton>
                <DangerButton>Logout</DangerButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
<script>
import BlockButton from '@/components/shared/buttons/BlockButton.vue';
import DangerButton from '@/components/shared/buttons/DangerButton.vue';

export default {
    components: { DangerButton, BlockButton },
};
</script>
