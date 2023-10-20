<template>
  <MainView :countries="props.countries" />
</template>

<script setup>
let props = defineProps(["countries"]);
import MainView from "~~/components/MainView.vue";
</script>

<style lang="scss" scoped></style>
