<template>
    <div>
        {{ input }}
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'PasswordInput.vue',
    props: {
        input: {
            type: String,
            default: '',
            required: true,
        },
        maxLen: {
            type: Number,
            default: 6,
            required: false,
        },
    },
    emits: [],
    setup(props, context) {
        return;
    },
});
</script>

<style scoped></style>
