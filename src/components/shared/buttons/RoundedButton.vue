<template>
    <button
        :class="props.active ? 'bg-orange-400' : 'bg-gray-400'"
        class="
            px-6
            py-3
            rounded-full
            shadow-sm
            min-w-fit min-h-fit
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
