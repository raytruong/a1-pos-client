<template>
    <PasswordInput :input="input"></PasswordInput>
    <NumPad v-model:input="input"></NumPad>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PasswordInput from '@/components/PasswordInput.vue';
import NumPad from '@/components/NumPad.vue';

const emit = defineEmits(['login-attempted']);
const input = ref('');
</script>

<style scoped></style>
