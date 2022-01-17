<template>
    <header
        class="flex justify-between items-center shadow-sm bg-white px-4 py-3"
    >
        <div>
            <HealthIndicator />
        </div>
        <div>
            <NavItemGroup>
                <NavItem
                    v-for="item in navItems"
                    :key="item.path"
                    :href="item.path"
                >
                    <button
                        :class="`block bg-gradient-to-r from-${item.color}-400 to-${item.color}-500 rounded-lg text-white text-md shadow-sm px-3 py-3`"
                    >
                        {{ item.text }}
                    </button>
                </NavItem>
            </NavItemGroup>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavItem from '@/components/navigation/NavItem.vue';
import NavItemGroup from '@/components/navigation/NavItemGroup.vue';
import HealthIndicator from '@/components/HealthIndicator.vue';

export default defineComponent({
    name: 'NavbarHeader.vue',
    components: { NavItem, NavItemGroup, HealthIndicator },
    setup(props, context) {
        const navItems = {
            dashboard: {
                text: 'Dashboard',
                path: '/dashboard',
                color: 'blue',
            },
            logout: {
                text: 'Logout',
                path: '/logout',
                color: 'red',
            },
        };
        return { navItems };
    },
});
</script>

<style scoped></style>
