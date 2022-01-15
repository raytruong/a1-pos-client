<template>
    <PasswordInput :input="input"></PasswordInput>
    <NumPad v-model:input="input"></NumPad>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PasswordInput from '@/components/PasswordInput.vue';
import NumPad from '@/components/NumPad.vue';

export default defineComponent({
    name: 'PasswordPrompt.vue',
    components: { PasswordInput, NumPad },
    props: {},
    emits: ['login-attempted'],
    setup(props, context) {
        const input = ref('');

        return {
            input,
        };
    },
});
</script>

<style scoped></style>
