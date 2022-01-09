<template>
  <main-layout>
    <p>404</p>
    <router-link to="/">Go to Home</router-link>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/Main.vue";

export default {
  name: "NotFoundView",
  components: {
    MainLayout
  }
};
</script>

<style scoped></style>
