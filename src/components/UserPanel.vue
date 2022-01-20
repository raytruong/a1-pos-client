<template>
    <div class="flex-col max-w-xs">
        <div class="mb-3 overflow-ellipsis">
            <div class="flex">
                <div class="relative mr-7">
                    <div class="absolute inset-y-0 left-0 flex items-center">
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
            <button
                class="
                    block
                    rounded-2xl
                    bg-blue-400
                    text-white text-md
                    shadow-sm
                    px-5
                    py-5
                    font-body
                "
            >
                Dashboard
            </button>
            <button
                class="
                    block
                    rounded-2xl
                    bg-red-400
                    text-white text-md
                    shadow-sm
                    px-5
                    py-2
                    font-body
                "
            >
                Logout
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const name = 'UserPanel.vue';
</script>

<style scoped></style>
