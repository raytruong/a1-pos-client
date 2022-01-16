<template>
    <li>
        <router-link :to="href">
            <slot />
        </router-link>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NavItem.vue',
    props: {
        href: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        return;
    },
});
</script>

<style scoped></style>
