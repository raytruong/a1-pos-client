<template>
    <button
        class="
            rounded-2xl
            bg-red-400
            text-white text-md
            shadow-sm
            min-w-fit min-h-fit
            p-4
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
