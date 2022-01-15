<template>
    <div
        class="
            relative
            p-2
            flex
            items-center
            justify-between
            text-slate-300
            font-semibold
            text-sm
            leading-6
            bg-gray-900
        "
    >
        <HealthIndicator />
        <NavItemGroup>
            <NavItem v-for="item in navItems" :key="item.path" :href="item.path"
                >{{ item.text }}
            </NavItem>
        </NavItemGroup>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavItem from '@/components/navigation/NavItem.vue';
import NavItemGroup from '@/components/navigation/NavItemGroup.vue';
import HealthIndicator from '@/components/shared/HealthIndicator.vue';

export default defineComponent({
    name: 'NavbarHeader.vue',
    components: { NavItem, NavItemGroup, HealthIndicator },
    setup(props, context) {
        const navItems = {
            dashboard: {
                text: 'Dashboard',
                path: '/dashboard',
            },
        };
        return { navItems };
    },
});
</script>

<style scoped></style>
