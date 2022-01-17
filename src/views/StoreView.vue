<template>
    <TwoPanelLayout>
        <template v-slot:leftPanel>
            <div>Left</div>
        </template>
        <template v-slot:rightPanel>
            <div>Right</div>
        </template>
    </TwoPanelLayout>
</template>

<script>
import TwoPanelLayout from '@/layouts/TwoPanelLayout.vue';

export default {
    name: 'StoreView',
    components: {
        TwoPanelLayout,
    },
};
</script>

<style scoped></style>
