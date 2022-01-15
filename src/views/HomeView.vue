<template>
    <MainLayout>
        <PasswordPrompt></PasswordPrompt>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/Main.vue';
import PasswordPrompt from '@/components/PasswordPrompt.vue';

export default {
    name: 'HomeView',
    components: {
        MainLayout,
        PasswordPrompt,
    },
};
</script>

<style scoped></style>
