<template>
    <button
        :class="active ? 'bg-orange-400' : 'bg-gray-400'"
        class="
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-sm
            min-w-fit min-h-fit
            p-4
            focus:brightness-110
            focus:outline-none
            focus:ring
            focus:ring-offset-2
            focus:ring-orange-300
        "
    >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
    active: {
        type: Boolean,
        default: false,
        required: true,
    },
});
</script>

<style scoped></style>
