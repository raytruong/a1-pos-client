<template>
    <button
        class="
            rounded-xl
            bg-red-400
            text-white text-md
            shadow-sm
            px-3
            py-3
            focus:outline-none
            focus:brightness-110
            focus:ring
            focus:ring-offset-2
            focus:ring-red-300
        "
    >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup></script>

<style scoped></style>
