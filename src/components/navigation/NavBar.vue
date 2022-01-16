<template>
    <header
        class="
            flex
            justify-between
            items-center
            shadow-2xl
            bg-gray-800
            px-4
            py-3
        "
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
                        :class="item.color ? item.color : 'bg-sky-500'"
                        class="block rounded-md text-white px-3 py-2"
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
            },
            logout: {
                text: 'Logout',
                path: '/logout',
                color: 'bg-red-400',
            },
        };
        return { navItems };
    },
});
</script>

<style scoped></style>
