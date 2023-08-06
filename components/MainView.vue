<template>
  <main class="h-full max-w-screen-xl m-auto">
    main view

    <!-- <div></div>
    {{ pending ? "loading" : data }} -->
    <div v-if="pending">Loading...</div>

    <div v-else id="gridCardContainer">
      <Card
        v-for="country in countries"
        :key="country.area"
        :country="country"
      />
      <!-- <div v-for="country in data">
        <Card country="country" />
        <p>{{ country.name.official }}</p>
      </div> -->
    </div>
  </main>
</template>

<script setup>
import Card from "~~/components/Card.vue";
const props = defineProps({
  countries: null,
});

const { pending, data: countries } = await useFetch(
  "https://restcountries.com/v3.1/subregion/North America",
  { lazy: true }
);
// const { pending, data: countries } = await useFetch(
//   "https://restcountries.com/v3.1/alpha/222",
//   { lazy: true }
// );
console.log(pending);
console.log(countries);
</script>

<style lang="css" scoped>
#gridCardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  justify-items: center;
  padding: 1rem;
}
</style>
