<template>
    <div class="grid grid-cols-16 h-screen">
        <div class="col-span-1 h-screen">
            <AppPanel></AppPanel>
        </div>
        <div class="col-span-11">
            <slot name="leftPanel"></slot>
        </div>
        <div class="col-span-4">
            <slot name="rightPanel"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppPanel from '@/components/shared/AppPanel.vue';
</script>
