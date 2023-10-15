<template>
  <!-- <div v-if="loading">Loading...</div> -->

  <div>
    <main
      class="flex flex-col m-auto gap-2 Psm:w-full max-w-7xl max-w-[830px]:items-center p-8 p"
    >
      <section class="my-8">
        <button
          :disabled="btnLinkCountryState.state"
          @click="backBtn"
          type="button"
          class="px-7 py-2 font-semibold rounded bg-white shadow-lg hover:shadow-xl"
          :class="
            countries.darkTheme
              ? ' dark:bg-country-darkBlue dark:hover:text-red-800'
              : ''
          "
        >
          <span class="mr-2">
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
          </span>

          Back
        </button>
      </section>
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
            class="w-[400px] Psm:w-full place-self-center Psm:place-self-start text-2xl font-bold tracking-wide mb-6"
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
                  <span class="detail">
                    {{
                      selectedCountry.name.nativeName[
                        Object.keys(selectedCountry.name.nativeName)[0]
                      ].official
                    }}
                  </span>
                </span>
                <span class="info"
                  >Population:
                  <span class="detail">
                    {{ selectedCountry.population.toLocaleString() }}
                  </span></span
                >
                <span class="info"
                  >Region:
                  <span class="detail">
                    {{ selectedCountry.region }}</span
                  ></span
                >
                <span class="info"
                  >Sub Region:
                  <span class="detail">
                    {{ selectedCountry.subregion }}
                  </span>
                </span>
                <span class="info"
                  >Capital:
                  <span class="detail">
                    {{
                      selectedCountry?.capital
                        ? selectedCountry.capital[0]
                        : "no capital"
                    }}
                  </span>
                </span>
              </div>

              <div>
                <span class="info"
                  >Top Level Domain:
                  <span class="detail">
                    {{ selectedCountry.tld[0] }}
                  </span></span
                >
                <span class="info"
                  >Currencies:
                  <span class="detail">
                    {{
                      selectedCountry.currencies[
                        Object.keys(selectedCountry.currencies)[0]
                      ].name
                    }}
                  </span>
                </span>
                <span class="info lang"
                  >Languages:
                  <span
                    v-for="(lang, index) in Object.values(
                      selectedCountry.languages
                    )"
                    class="detail"
                  >
                    <!-- {{
                      selectedCountry.languages[
                        Object.keys(selectedCountry.languages)[0]
                      ]
                    }} -->

                    <span
                      v-if="
                        index ===
                        Object.values(selectedCountry.languages).length - 1
                      "
                    >
                      {{ lang }}
                    </span>
                    <span v-else>{{ lang }}, </span>
                  </span>
                </span>
              </div>
            </div>

            <div
              class="flex flex-row flex-wrap gap-2 Psm:w-full w-[400px] place-self-center Psm:place-self-start"
            >
              <span class="info">Border Countries: </span>
              <li class="inline" v-if="borderCountries.length <= 0">
                No borders
              </li>
              <li
                v-if="borderCountries"
                class="inline mb-4"
                v-for="border in borderCountries"
              >
                <!-- prettier-ignore-attribute (external) -->
                <!-- <NuxtLink
                  external
                  class="bg-white drop-shadow-md hover:bg-gray-50 text-black py-2 px-4 rounded-sm"
                  :href="
                    `/country/` +
                    border.name
                      .replace(/\s+/g, '-')
                      .toLowerCase()
                      .concat(`?id=${border.alphaID}`)
                  "
                  >{{ border.name }}</NuxtLink
                > -->
                <button
                  :disabled="btnLinkCountryState.state"
                  @click="
                    navigateToNewPage(
                      `/country/` +
                        border.name
                          .replace(/\s+/g, '-')
                          .toLowerCase()
                          .concat(`?id=${border.alphaID}`)
                    )
                  "
                  class="bg-white shadow-lg hover:bg-gray-50 py-2 px-4 rounded-sm font-light"
                  :class="
                    countries.darkTheme
                      ? 'dark:hover:bg-gray-800 dark:bg-country-darkBlue'
                      : ''
                  "
                >
                  {{ border.name }}
                </button>
              </li>
            </div>
          </div>
        </aside>
      </section>
      <aside class="w-full max-w-[1200px]">
        <article
          class="mt-4 flex flex-col w-full place-self-center Psm:place-self-start"
        >
          <p class="info">Summary:</p>
          <p class="detail" v-if="!wikiDataSum">{{ wikiDataSum }} Loading...</p>

          <section v-else class="w-11/12 Psm:w-full py-6 mb-4 m-auto">
            <span class="block w-fit detail">{{
              wikiDataSum.value.extract
            }}</span>
            <span class="mt-8 block text-right">
              <p class="inline info">
                Visit Wikipedia for

                <a
                  class="inline detail text-blue-300 hover:underline"
                  target="_blank"
                  :href="wikiDataSum.value.content_urls.desktop.page"
                >
                  more info
                  <svg
                    class="w-3 h-3 inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </p>
            </span>
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

        <Map
          :btnLinkCountryState="btnLinkCountryState"
          :clickLink="clickLink"
          v-if="mapShow"
          :foundCoord="foundCoord"
          :latLng="selectedCountry"
          :loading="loading"
        />
      </aside>
    </main>
  </div>
</template>

<script setup>
import Map from "~/components/Map.vue";
import { world } from "../../public/countries-geo.js";
import { countries } from "~/composables/store";
import { world2 } from "../../public/isoCodeJson.js";

// import { ref, onMounted } from "vue";
// let localStorageCountry = JSON.parse(localStorage.getItem("selectedCountry"));

const borderCountries = reactive([]);

const wikiDataSum = ref(false);
let selectedCountry = ref({});
const route = useRoute();
const router = useRouter();
let loading = ref(false);
let mapShow = ref(false);
let clickLink = ref({});
let foundCoord;
var btnLinkCountryState = ref({ state: true });
const navigateToNewPage = async (route) => {
  await clickLink._rawValue.value();
  await navigateTo(route);
};

const backBtn = async () => {
  await clickLink._rawValue.value();
  router.back();
};
//===== func is to grab all match alpha3 to border names =====
async function getBorderCountries(border) {
  if (border === undefined) return;

  border?.forEach((borderName) => {
    let borderFound = world2.find((el) => el.alpha3 === borderName);

    let countryName = new Intl.DisplayNames(["en-US"], { type: "region" }).of(
      borderFound.alpha2
    );

    borderCountries.push({
      name: countryName,
      alphaID: borderFound.number,
    });
  });
}
// func checks if country selected is match to id in search query , if match it grabs data from local storage that was save from previous page.If no match then it grabs data from api
async function getCountryStorage() {
  let localStorageCountry = JSON.parse(localStorage.getItem("selectedCountry"));
  if (localStorageCountry.ccn3 === route.query.id) {
    selectedCountry = localStorageCountry;
    await getWikiData();
  } else {
    await getCountryApi();
  }
}
// func gets country from api if local storage id does not match to query id
async function getCountryApi() {
  let paramName = route.params.id;
  const { pending, data: oneCountry } = await useFetch(
    `https://restcountries.com/v3.1/alpha/${route.query.id}`,
    { lazy: false, server: false }
  );
  loading.value = pending;
  if (
    paramName !=
    oneCountry._rawValue[0].name.common.replace(/\s+/g, "-").toLowerCase()
  ) {
    await navigateTo({
      path: `/country/${oneCountry._rawValue[0].name.common
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
      query: {
        id: oneCountry._rawValue[0].ccn3,
      },
      replace: true,
    });
  }

  selectedCountry = oneCountry._rawValue[0];

  await getWikiData();
}

async function getWikiData() {
  await getBorderCountries(selectedCountry.borders);
  const { pending, data: wikiData } = useFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${
      selectedCountry.name.common
    }${selectedCountry.name.common === "Georgia" ? `(country)` : ""}`,
    { lazy: true, server: false }
  );

  watch(pending, async (pending, prevPending) => {
    wikiDataSum.value = wikiData;
    // await getMapScript();
    await findCoors();
  });
}
//===== function is to find the coordinate for the map, it searches an array for country =====
async function findCoors() {
  foundCoord = world.features.find((el) => el.id === selectedCountry.cca3);
  mapShow.value = true;
  return;
}
//===== check for local storage to see if country is set, this code gets all data require for page to function =====
localStorage.getItem("selectedCountry") != false && (await getCountryStorage());
localStorage.getItem("selectedCountry") === false && (await getCountryApi());
//===== ==================================== =====
</script>

<style lang="css" scoped>
#map {
  width: 100%;
  height: 100%;
}

.info {
  display: block;
  font-weight: 500;
}

.detail {
  font-weight: 200;
  letter-spacing: 1px;
  margin-right: 0.5rem;
}
</style>
