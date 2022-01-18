<template>
    <div class="grid grid-cols-8 h-screen">
        <div class="col-span-6">
            <slot name="leftPanel"></slot>
        </div>
        <div class="col-span-2">
            <slot name="rightPanel"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const name = 'TwoPanelLayout';
</script>
