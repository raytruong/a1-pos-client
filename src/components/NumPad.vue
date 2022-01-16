<template>
    <div>
        <div @click="onNumInput('1', $event)">Number Button</div>
        <div @click="onDeleteInput">Delete Button</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'NumPad.vue',
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
    emits: ['update:input'],
    setup(props, context) {
        const inputCharArray = ref(Array.from(props.input));

        const onNumInput = (num: string, event: Event) => {
            if (inputCharArray.value.length < props.maxLen) {
                inputCharArray.value.push(num);
            }
            context.emit('update:input', inputCharArray.value.join(''));
        };

        const onDeleteInput = () => {
            inputCharArray.value.pop();
            context.emit('update:input', inputCharArray.value.join(''));
        };

        return {
            onNumInput,
            onDeleteInput,
        };
    },
});
</script>

<style scoped></style>
