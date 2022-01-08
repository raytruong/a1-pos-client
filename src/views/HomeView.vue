<template>
  <main-layout>
    <p>Welcome home!</p>
    <router-link to="/NotFound">Go to 404</router-link>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/Main.vue";

export default {
  name: "HomeView",
  components: {
    MainLayout
  }
};
</script>

<style scoped></style>
