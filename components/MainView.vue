<template>
  <main class="max-w-screen-xl m-auto pt-8">
    <Search />

    <div v-if="pending">Loading...</div>

    <div v-else id="gridCardContainer">
      <Card v-for="(country, index) in countries.loadedCountries" :key="country.ccn3" :country="country" />
      <!-- <div v-for="country in data">
        <Card country="country" />
        <p>{{ country.name.official }}</p>
      </div> -->
    </div>
  </main>
</template>

<script setup>
import { countries } from "../composables/store";
import Card from "~~/components/Card.vue";
import Search from "~~/components/globalUI/Search.vue";

const countriesRef = ref(countries.loadedCountries);


//===== initail start data when first load =====
const { pending, data, refresh, execute } = await useFetch(
  `https://restcountries.com/v3.1/region/${countries.region}`,
  { lazy: true, server: false }
);
const loading = ref(pending);
//===== watch func reacts when loading changes =====
watch(loading, (loading, prevLoading) => {
  countriesRef.value = data;
  countries.loadedCountries = data;
  localStorage.setItem("countries", JSON.stringify(data));

});
//===== watch func reacts to countries.region data is use to update country region data =====
watch(
  () => countries.region,
  async (region, prevRegion) => {
    const { data: newData } = await useFetch(
      `https://restcountries.com/v3.1/region/${countries.region}`,
      { lazy: true, server: false }
    );
    countries.loadedCountries = newData;
  }
);
</script>

<style lang="css" scoped>
#gridCardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
  padding: 1rem;
}
</style>
