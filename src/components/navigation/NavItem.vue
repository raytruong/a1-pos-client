<template>
    <li>
        <router-link :to="href">
            <slot />
        </router-link>
    </li>
</template>

<script lang="ts" setup>
const props = defineProps({
    href: {
        type: String,
        required: true,
    },
});
</script>

<style scoped></style>
