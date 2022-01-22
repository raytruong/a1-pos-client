<template>
    <div
        class="
            flex flex-row
            items-center
            gap-8
            px-4
            py-2
            text-white text-sm
            overflow-x-scroll
            no-scrollbar
        "
    >
        <button
            v-for="(btn, index) in buttons"
            :key="btn.val"
            :class="index === activeIndex ? 'bg-orange-400' : 'bg-gray-400'"
            class="px-6 py-3 rounded-full min-w-fit"
            @click="onClick(btn.val, index)"
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
            return Boolean(
                value.length > 0 &&
                    value.every((btn: any) => {
                        return btn.text && btn.val;
                    }),
            );
        },
    },
});
const emit = defineEmits(['update:modelValue']);

let activeIndex = ref(0);
let activeValue = ref('');

const onClick = (value: string, index: number): void => {
    activeIndex.value = index;
    activeValue.value = value;
    emit('update:modelValue', activeValue);
};

onBeforeMount(() => {
    emit('update:modelValue', props.buttons[activeIndex.value].val);
});
</script>

<style scoped></style>
