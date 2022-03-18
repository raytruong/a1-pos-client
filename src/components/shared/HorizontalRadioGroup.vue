<template>
    <div
        class="
            flex flex-row
            items-center
            gap-8
            text-white text-sm
            overflow-x-scroll
            no-scrollbar
            p-2
        "
    >
        <RoundedButton
            v-for="(btn, index) in buttons"
            :key="btn.val"
            :active="activeIndex === index"
            @click="onClick(btn.val, index)"
        >
            {{ btn.text }}
        </RoundedButton>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType, watch } from 'vue';
import RoundedButton from '@/components/shared/buttons/RoundedButton.vue';

const props = defineProps({
    buttons: {
        type: Array as PropType<Array<Record<string, string>>>,
        default: [] as PropType<Array<Record<string, string>>>,
        required: true,
        validator: (value: any) => {
            return Boolean(
                value.every((btn: any) => {
                    return btn.text && btn.val;
                }),
            );
        },
    },
    defaultSelected: {
        type: Boolean,
        required: false,
    },
});
const emit = defineEmits(['update:modelValue']);

let activeIndex = ref();
let activeValue = ref('');

if (props.defaultSelected) {
    watch(
        () => props.buttons,
        () => {
            activeIndex.value = 0;
            emit('update:modelValue', props.buttons[activeIndex.value].val);
        },
    );
}

const onClick = (value: string, index: number): void => {
    activeIndex.value = index;
    activeValue.value = value;
    emit('update:modelValue', activeValue.value);
};
</script>

<style scoped></style>
