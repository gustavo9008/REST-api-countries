<template>
  <!-- <Header /> -->
  <MainView :countries="props.countries" />
  <!-- <Footer /> -->
</template>

<script setup>
let props = defineProps(["countries"]);

// import { world } from "../public/minOutput.js";
// console.log(world);
// import Header from "../components/globalUI/Header.vue";
import MainView from "~~/components/MainView.vue";
import Footer from "~~/components/globalUI/Footer.vue";
</script>

<style lang="scss" scoped></style>
