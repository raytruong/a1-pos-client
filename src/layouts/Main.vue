<template>
    <div>
        <NavbarHeader />
        <slot></slot>
    </div>
</template>

<script lang="ts">
import NavbarHeader from '@/components/navigation/NavBar.vue';

export default {
    name: 'MainLayout',
    components: { NavbarHeader },
};
</script>
