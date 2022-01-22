<template>
    <div class="flex flex-row items-center gap-8 px-4 py-2 text-white text-sm">
        <button class="bg-orange-400 px-5 py-3 rounded-full">Full Set</button>
        <button class="bg-orange-400 px-5 py-3 rounded-full">Fill In</button>
        <button class="bg-orange-400 px-5 py-3 rounded-full">Pedicure</button>
        <button class="bg-orange-400 px-5 py-3 rounded-full">Manicure</button>
        <button class="bg-orange-400 px-5 py-3 rounded-full">
            Polish Change
        </button>
        <button class="bg-orange-400 px-5 py-3 rounded-full">Kids</button>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';

const props = defineProps({
    buttons: { type: Array as PropType<Array<number>>, required: true },
});
const emit = defineEmits(['update:value']);

const value = ref('');

const onSelect = (): void => {
    emit('update:value', value);
};
</script>

<style scoped></style>
