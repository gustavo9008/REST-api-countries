<template>
  <!-- <button
    type="button"
    class="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6 inline"
    >
      <path
        fill-rule="evenodd"
        d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
        clip-rule="evenodd"
      />
    </svg>

    Back
  </button> -->
  <!-- <div v-if="loading">Loading...</div> -->

  <div>
    <main
      class="flex flex-col m-auto gap-2 Psm:w-full max-w-7xl max-w-[830px]:items-center p-8 p"
    >
      <section
        class="flex flex-row gap-8 Psm:flex-col max-h-96 Psm:max-h-max justify-between"
      >
        <picture class="w-full max-w-[600px] Psm:place-self-center">
          <img
            v-bind:src="selectedCountry.flags.png"
            alt=""
            class="object-full w-full object-center dark:bg-gray-500"
          />
        </picture>
        <aside class="w-[500px] Psm:w-full flex flex-col Psm:flex-none">
          <h1
            class="w-[400px] Psm:w-full place-self-center Psm:place-self-start text-2xl font-bold tracking-wide"
          >
            {{ selectedCountry.name.common }}
          </h1>

          <div class="flex gap-8 flex-col justify-center">
            <!-- info split section -->
            <div
              class="flex Psm:flex-col gap-4 Psm:w-full w-[400px] place-self-center Psm:place-self-start"
            >
              <div>
                <span class="info">
                  Native Name:
                  <!-- {{ Object.keys(selectedCountry.name.nativeName[0]) }}</span -->
                  {{
                    selectedCountry.name.nativeName[
                      Object.keys(selectedCountry.name.nativeName)[0]
                    ].official
                  }}</span
                >
                <span class="info"
                  >Population: {{ selectedCountry.population }}</span
                >
                <span class="info"
                  >Region:
                  <span class="detail">
                    {{ selectedCountry.region }}</span
                  ></span
                >
                <span class="info"
                  >Sub Region: {{ selectedCountry.subregion }}</span
                >
                <span class="info"
                  >Capital:
                  {{
                    selectedCountry?.capital
                      ? selectedCountry.capital[0]
                      : "no capital"
                  }}</span
                >
              </div>

              <div>
                <span class="info"
                  >Top Level Domain: {{ selectedCountry.tld[0] }}</span
                >
                <span class="info"
                  >Currencies:
                  {{
                    selectedCountry.currencies[
                      Object.keys(selectedCountry.currencies)[0]
                    ].name
                  }}</span
                >
                <span class="info"
                  >Languages:
                  {{
                    selectedCountry.languages[
                      Object.keys(selectedCountry.languages)[0]
                    ]
                  }}</span
                >
              </div>
            </div>

            <div
              class="gap-2 Psm:w-full w-[400px] Psm- place-self-center Psm:place-self-start"
            >
              <span class="info">Border Countries:</span>
              <li class="inline" v-for="border in selectedCountry.borders">
                {{ border + " " }}
                <!-- {{ new Intl.DisplayNames(['en-US'], {type: 'region', fallback: "code"}).of("CAN") }} -->
              </li>
            </div>
          </div>
        </aside>

        <!-- <div>hello from {{ oneCountry }}</div> -->
      </section>
      <aside class="pt-12 w-full max-w-[1200px]">
        <article
          class="flex flex-col Psm:max-w-full max-w-[400px] place-self-center Psm:place-self-start"
        >
          <p v-if="!wikiDataSum">{{ wikiDataSum }} Loading...</p>

          <section v-else class="w-full">
            <span class="block w-fit">{{ wikiDataSum.value.extract }}</span>
          </section>
          <!-- <section class="w-[400px]">
          <img
            v-bind:src="selectedCountry.flags.svg"
            alt=""
            class="object-cover dark:bg-gray-500"
          />
          placeholder for maps
        </section> -->
        </article>
        <!-- wikiData -->

        <section class="w-full Psm:min-w-full h-[600px] max-w-[]">
          <div id="map"></div>
        </section>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { world } from "../../public/countries-geo.js";
// import { ref, onMounted } from "vue";
let localStorageCountry = JSON.parse(localStorage.getItem("selectedCountry"));

const wikiDataSum = ref(false);
let selectedCountry = ref({});
const route = useRoute();
let loading = ref(false);

var loaded = false;

console.log(world.features);
let foundCoord = world.features.find(
  (el) => el.id === localStorageCountry.cca3
);
// func checks if country selected is match to id in search query , if match it grabs data from local storage
async function getCountryStorage() {
  console.log(selectedCountry);
  // let localStorageCountry = JSON.parse(localStorage.getItem("selectedCountry"));
  if (localStorageCountry.ccn3 === route.query.id) {
    console.log(route.query.id);
    selectedCountry = localStorageCountry;
    console.log(selectedCountry);
    await getWikiData();
  } else {
    await getCountryApi();
  }
}
// func gets country from api if local storage id does not match to query id
async function getCountryApi() {
  console.log(route.params);

  const { pending, data: oneCountry } = await useFetch(
    `https://restcountries.com/v3.1/alpha/${route.query.id}`,
    { lazy: false, server: false }
  );
  loading = pending;
  console.log(oneCountry);
  selectedCountry = oneCountry._rawValue[0];

  await getWikiData();
}

async function getWikiData() {
  console.log("getWikiData");
  console.log(selectedCountry.name.common);
  const { pending, data: wikiData } = useFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedCountry.name.common}`,
    { lazy: true, server: false }
  );
  watch(pending, (pending, prevPending) => {
    wikiDataSum.value = wikiData;
  });
}
localStorage.getItem("selectedCountry") != false &&
  (await getCountryStorage(), console.log("getCountryStoragerunnin"));
localStorage.getItem("selectedCountry") === false && (await getCountryApi());

async function getMapScript() {
  console.log("getting map");

  const leafCssImport = document.createElement("link");
  leafCssImport.setAttribute("rel", "stylesheet");
  leafCssImport.setAttribute("crossorigin", "");
  leafCssImport.setAttribute(
    "href",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  );
  leafCssImport.setAttribute(
    "integrity",
    "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  );
  document.head.appendChild(leafCssImport);
  // import mapim from "../../scripts/leaflet/dist/leaflet"
  const mapImport = document.createElement("script");
  mapImport.setAttribute("async", "true");
  mapImport.setAttribute("crossorigin", "");
  mapImport.setAttribute(
    "integrity",
    "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  );
  mapImport.setAttribute(
    "src",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  );
  mapImport.setAttribute("onload", "loaded=true");
  loading.value = true;
  document.head.appendChild(mapImport);

  console.log(loaded);
}

async function addMapToDom() {
  console.log(loaded);
  console.log(foundCoord);

  console.log("adding map to dom");
  var map = L.map("map").setView(
    [localStorageCountry.latlng[0], localStorageCountry.latlng[1]],
    5
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.geoJson(foundCoord).addTo(map);

  L.marker([
    localStorageCountry.capitalInfo.latlng[0],
    localStorageCountry.capitalInfo.latlng[1],
  ])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
  console.log(map);
}

onNuxtReady(async () => {
  await getMapScript();
});

watch(loading, (loading, prevLoading) => {
  console.log(loading);
  setTimeout(() => {
    addMapToDom();
  }, 3000);
});

// onNuxtReady(async () => {
//   console.log(loaded);
//   await addMapToDom();
// });
</script>

<style lang="css" scoped>
#map {
  width: 100%;
  height: 100%;
}
.info {
  display: block;
  font-weight: 600;
}
.detail {
  font-weight: 300;
}
</style>
