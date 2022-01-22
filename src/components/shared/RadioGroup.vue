<template>
    <div class="flex flex-row items-center gap-8 px-4 py-2 text-white text-sm">
        <button
            v-for="(btn, index) in buttons"
            :key="btn.val"
            :class="index === activeIndex ? 'bg-orange-400' : 'bg-gray-400'"
            class="px-5 py-3 rounded-full"
            @click="onSelect(index)"
        >
            {{ btn.text }}
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType, onBeforeMount } from 'vue';

const props = defineProps({
    buttons: {
        type: Array as PropType<Array<Record<string, string>>>,
        required: true,
        validator: (value: any) => {
            return (
                value.length > 0 &&
                value.every((btn: any) => {
                    return btn.text && btn.val;
                })
            );
        },
    },
});
const emit = defineEmits(['update:modelValue']);

let activeIndex = ref(0);

const onSelect = (index: number): void => {
    activeIndex.value = index;
    emit('update:modelValue', props.buttons[index].val);
};

onBeforeMount(() => {
    emit('update:modelValue', props.buttons[activeIndex.value].val);
});
</script>

<style scoped></style>
