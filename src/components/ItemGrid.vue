<template>
    <div class="grid grow grid-rows-3 grid-cols-5 gap-x-12 gap-y-8 m-4">
        <div
            v-for="n in 64"
            :key="n"
            class="
                flex flex-grow
                justify-center
                min-h-fit min-w-fit
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
                            {{ n }} Gel Polish
                        </h1>
                        <h1 class="text-orange-500 text-lg truncate">$7.25</h1>
                    </div>
                    <p class="text-gray-500 font-light truncate">Full Set</p>
                </div>
                <div class="mt-4 flex justify-center">
                    <button
                        class="
                            grow
                            rounded-xl
                            bg-blue-400
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
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';

// const props = defineProps({});
// const emits = defineEmits([]);
</script>

<style scoped></style>
