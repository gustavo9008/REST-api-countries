<template>
  <div @click="routePush" class="card rounded-md shadow-lg"
    :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''">
    <figure class="aspect-w-16 aspect-h-9">
      <img v-bind:src="country.flags.svg" alt="" class="object-cover object-center rounded-t-md dark:bg-gray-500" />
    </figure>

    <div class="px-6 py-4">
      <div class="space-y-2">
        <h2 class="text-lg font-medium">
          <NuxtLink :href="`country/` +
            country.name.official
              .replace(/\s+/g, '-')
              .toLowerCase()
              .concat(`?id=${country.ccn3}`)
            ">{{ country.name.official }}</NuxtLink>
        </h2>
        <h4>
          Population:
          <span class="infoCardText">
            {{ country.population.toLocaleString() }}
          </span>
        </h4>
        <h4>
          Region: <span class="infoCardText"> {{ country.region }} </span>
        </h4>
        <h4>
          Capital:
          <span class="infoCardText">
            {{ country?.capital ? country.capital[0] : "no capital" }}
          </span>
        </h4>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["country"]);

const countryData = ref(props.country);

//===== func pushes selected country into localstorage for data load in id route =====
async function routePush(event, error) {
  let linkCountry = null;
  async function saveCountryToLocalStorage() {
    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(countryData._rawValue)
    );
    linkCountry =
      `/country/` +
      countryData._rawValue.name.common
        .replace(/\s+/g, "-")
        .toLowerCase()
        .concat(`?id=${countryData._rawValue.ccn3}`);
  }
  await saveCountryToLocalStorage();

  if (linkCountry != null) {
    await navigateTo(linkCountry);
  }
}
</script>

<style lang="css" scoped>
.card {
  width: clamp(280px, 30vw, 300px);
  min-height: 350px;
  max-height: 450px;
}

h4 {
  font-size: small;
  font-weight: 400;
}

.infoCardText {
  font-weight: 100;
  letter-spacing: 1px;
}

@media (max-width: 610px) {
  .card {
    width: clamp(320px, 30vw, 400px);
  }
}
</style>
