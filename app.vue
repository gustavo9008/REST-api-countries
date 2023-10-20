<template>
  <!-- main container -->
  <div class="bg-country-veryLightGray h-[100vh] overflow-auto" :class="countries.darkTheme
      ? 'dark:bg-country-veryDarkBlue dark:text-country-white'
      : ''
    ">
    <Header />
    <NuxtPage :countries="countries" />
  </div>
</template>

<script setup>
import { countries } from "./composables/store";
import Header from "./components/globalUI/Header.vue";
</script>

<style lang="css">
body,
html {
  min-height: 100%;
}
</style>
