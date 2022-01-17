<template>
    <div class="grid grid-cols-4 h-screen">
        <div class="col-span-3 bg-gradient-to-r from-sky-400 to-blue-500">
            <slot name="leftPanel"></slot>
        </div>
        <div class="col-span-1 bg-gradient-to-r from-red-400 to-green-500">
            <slot class="col-span-1" name="rightPanel"></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'TwoPanelLayout',
};
</script>
