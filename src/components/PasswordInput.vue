<template>
    <div>
        {{ input }}
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    input: {
        type: String,
        default: '',
    },
    maxLen: {
        type: Number,
        default: 6,
    },
});
</script>

<style scoped></style>
