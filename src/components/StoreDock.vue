<template>
    <div
        class="
            px-4
            py-4
            mb-4
            flex flex-grow
            justify-between
            rounded-2xl
            shadow-lg
            outline outline-1 outline-gray-300
        "
    >
        <UserPanel />
        <div class="border-r w-0.5 py-6"></div>
        <div class="border-r w-0.5 py-6"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import UserPanel from '@/components/UserPanel.vue';

// const props = defineProps({});
// const emits = defineEmits([]);
</script>

<style scoped></style>
