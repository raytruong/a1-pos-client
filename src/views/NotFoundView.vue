<template>
    <main-layout>
        <p>404</p>
        <router-link to="/">Go to Home</router-link>
    </main-layout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/TwoPanelLayout.vue';

const name = 'NotFoundView';
</script>

<style scoped></style>
