<template>
  <section
    class="flex flex-row justify-between Psm:justify-center flex-wrap m-auto"
  >
    <div
      class="mb-3 relative rounded shadow-lg"
      :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''"
    >
      <div
        class="relative shadow-md flex w-96 flex-wrap items-stretch p-3 rounded bg-country-white"
        :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''"
      >
        <!--Search icon-->
        <span
          v-if="search.showResults === false"
          @click="search.searchAPI"
          class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center font-normal cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            :fill="countries.darkTheme ? 'white' : 'black'"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span
          v-else
          @click="search.clearSearch"
          class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center font-normal cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :fill="countries.darkTheme ? 'white' : 'black'"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <input
          v-model="search.searchVal"
          @keyup.enter="search.searchAPI"
          type="search"
          class="relative m-0 block w-[1px] min-w-0 flex-auto rounded px-3 py-[0.25rem] outline-none focus:text-country-veryDarkBlue focus:outline-none dark:placeholder:text-neutral-400"
          :class="
            countries.darkTheme
              ? 'dark:bg-country-darkBlue dark:focus:text-country-white'
              : ''
          "
          placeholder="Search for country..."
          aria-label="Search"
        />
      </div>
      <div
        v-if="search.showResults && search.searchResults.length > 0"
        class="bg-white absolute w-96 max-h-[600px] Psm:max-h-[90vmin] overflow-scroll mt-2 z-50 hideScrollbar py-4 shadow-lg rounded"
        :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''"
      >
        <span
          @click="routePush(index, result)"
          v-for="(result, index) in search.searchResults"
          :key="index"
          class="block cursor-pointer px-4 py-2 hover:text-blue-300"
        >
          {{ result.name.common }}
        </span>
      </div>

      <div
        v-else-if="search.showResults && search.searchResults.length <= 0"
        class="bg-white absolute w-96 max-h-[600px] Psm:max-h-[90vmin] overflow-scroll mt-2 z-50 hideScrollbar py-4 shadow-lg rounded"
        :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''"
      >
        <span class="block px-4 py-2"> No results found :( </span>
      </div>
    </div>

    <div class="w-[200px] relative">
      <button
        @click="showOptions = !showOptions"
        class="bg-white shadow-lg w-full font-bold py-4 px-4 rounded inline-flex items-center"
        :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''"
      >
        Filter by Region
        <span class="pl-4"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>
      <div
        v-if="showOptions"
        class="bg-white py-2 absolute w-[200px] z-50 mt-1 shadow-lg rounded"
        :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''"
      >
        <span
          @click="changeRegion(`Africa`)"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
          :class="countries.darkTheme ? 'dark:hover:bg-gray-800' : ''"
        >
          Africa
        </span>
        <span
          @click="changeRegion(`America`)"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
          :class="countries.darkTheme ? 'dark:hover:bg-gray-800' : ''"
          >America</span
        >
        <span
          @click="changeRegion(`Asia`)"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
          :class="countries.darkTheme ? 'dark:hover:bg-gray-800' : ''"
          >Asia</span
        >
        <span
          @click="changeRegion(`Europe`)"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
          :class="countries.darkTheme ? 'dark:hover:bg-gray-800' : ''"
          >Europe</span
        >
        <span
          @click="changeRegion(`Oceania`)"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100"
          :class="countries.darkTheme ? 'dark:hover:bg-gray-800' : ''"
          >Oceania</span
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { countries } from "../../composables/store";
const search = ref({
  searchVal: "",
  showResults: false,
  searchAPI: async function () {
    const { data: search } = await useFetch(
      `https://restcountries.com/v3.1/name/${this.searchVal}`,
      { lazy: true, server: false }
    );

    // if(search._rawValue.length <= 0){
    //   this.showResults =
    // }
    // this.searchResults = search

    if (search._rawValue !== null) {
      this.showResults === false && (this.showResults = !this.showResults);

      this.searchResults = search;
    }
    if (search._rawValue === null) {
      this.showResults === false && (this.showResults = !this.showResults);
      this.searchResults = [];
      this.searchErr = true;
    }
  },
  clearSearch: async function () {
    this.showResults = false;
    this.searchResults = [];
    this.searchVal = "";
    return;
  },
  searchResults: [],
});
const showOptions = ref(false);

function changeRegion(region) {
  showOptions.value = !showOptions.value;
  countries.region = region;
}

//===== func pushes selected country into localstorage for data load in id route =====
async function routePush(indexNum, country) {
  let selectedCountry = search._rawValue.searchResults._rawValue[indexNum];
  console.log(selectedCountry);
  let linkCountry = null;
  async function saveCountryToLocalStorage() {
    localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
    linkCountry =
      `/country/` +
      selectedCountry.name.common
        .replace(/\s+/g, "-")
        .toLowerCase()
        .concat(`?id=${selectedCountry.ccn3}`);
  }

  await saveCountryToLocalStorage();
  if (linkCountry != null) {
    await navigateTo(linkCountry);
  }
}
</script>

<style lang="css" scoped>
.hideScrollbar::-webkit-scrollbar {
  display: none;
}

.hideScrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
