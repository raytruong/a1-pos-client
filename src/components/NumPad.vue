<template>
    <div>
        <div @click="onNumInput('1', $event)">Number Button</div>
        <div @click="onDeleteInput">Delete Button</div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const name = 'NumPad.vue';
const props = defineProps({
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
});
const emit = defineEmits(['update:input']);
const inputCharArray = ref(Array.from(props.input));

const onNumInput = (num: string, event: Event): void => {
    if (inputCharArray.value.length < props.maxLen) {
        inputCharArray.value.push(num);
    }
    emit('update:input', inputCharArray.value.join(''));
};

const onDeleteInput = (): void => {
    inputCharArray.value.pop();
    emit('update:input', inputCharArray.value.join(''));
};
</script>

<style scoped></style>
