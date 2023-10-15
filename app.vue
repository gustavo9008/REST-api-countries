<template>
  <!-- main container -->
  <div
    class="bg-country-veryLightGray h-[100vh] overflow-auto"
    :class="
      countries.darkTheme
        ? 'dark:bg-country-veryDarkBlue dark:text-country-white'
        : ''
    "
  >
    <Header />

    <!-- <NuxtWelcome /> -->
    <NuxtPage :countries="countries" />
  </div>
</template>

<script setup>
import { countries } from "./composables/store";
import Header from "./components/globalUI/Header.vue";

// const countryData = useState('countryData')
</script>

<style lang="css">
body,
html {
  min-height: 100%;
}
</style>
