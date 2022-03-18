<template>
    <div class="flex align-center items-center justify-between p-4">
        <h1 class="text-2xl">Payment Type:</h1>
        <RadioGroup v-model="paymentType" :buttons="radioButtons"></RadioGroup>
    </div>
    <div class="flex align-center items-center justify-between p-4">
        <h1 class="text-2xl">Total Price:</h1>
        <h1 class="text-2xl text-orange-500">
            {{ props.totalPrice.toString() }}
        </h1>
    </div>
    <div class="flex p-4">
        <BlockButton>Checkout</BlockButton>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Currency from '@/lib/models/Currency';
import RadioGroup from '@/components/shared/HorizontalRadioGroup.vue';
import BlockButton from '@/components/shared/buttons/BlockButton.vue';
import { useCartStore } from '@/stores/cartStore';

const cart = useCartStore();

const props = defineProps({
    totalPrice: {
        type: Currency,
        required: true,
        default: new Currency(0),
    },
});

const radioButtons = [
    { text: 'Cash', val: 'cash' },
    { text: 'Credit', val: 'credit' },
];

const paymentType = ref('');
watch(paymentType, (val) => {
    if (val === 'cash') {
        cart.setCashPaymentType();
    } else {
        cart.setCreditPaymentType();
    }
});
</script>

<style scoped></style>
