<template>
  <button
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
  </button>
  <div v-if="pending">Loading...</div>

  <div v-else>
    <main
      class="flex flex-col m-auto gap-2 Psm:w-full max-w-7xl max-w-[830px]:items-center p-8 p"
    >
      <section
        class="flex flex-row gap-8 Psm:flex-col max-h-96 Psm:max-h-max justify-between"
      >
        <picture class="w-full max-w-[650px]">
          <img
            v-bind:src="oneCountry[0].flags.png"
            alt=""
            class="object-full w-full object-center dark:bg-gray-500"
          />
        </picture>
        <aside class="max-w-[500px]">
          <h1 class="text-2xl font-bold tracking-wide">
            {{ oneCountry[0].name.common }}
          </h1>

          <div class="flex flex-wrap gap-4">
            <!-- info split section -->
            <div class="flex">
              <div>
                <span id="info" class="">
                  Native Name:
                  <!-- {{ Object.keys(oneCountry[0].name.nativeName[0]) }}</span -->
                  {{
                    oneCountry[0].name.nativeName[
                      Object.keys(oneCountry[0].name.nativeName)[0]
                    ].official
                  }}</span
                >
                <span id="info"
                  >Population: {{ oneCountry[0].population }}</span
                >
                <span id="info"
                  >Region:
                  <span class="detail"> {{ oneCountry[0].region }}</span></span
                >
                <span id="info">Sub Region: {{ oneCountry[0].subregion }}</span>
                <span id="info">Capital: {{ oneCountry[0].capital[0] }}</span>
              </div>

              <div>
                <span id="info"
                  >Top Level Domain: {{ oneCountry[0].tld[0] }}</span
                >
                <span id="info"
                  >Currencies:
                  {{
                    oneCountry[0].currencies[
                      Object.keys(oneCountry[0].currencies)[0]
                    ].name
                  }}</span
                >
                <span id="info"
                  >Languages:
                  {{
                    oneCountry[0].languages[
                      Object.keys(oneCountry[0].languages)[0]
                    ]
                  }}</span
                >
              </div>
            </div>

            <div class="gap-2">
              <h1>Border Countries:</h1>
              <li class="inline" v-for="border in oneCountry[0].borders">
                {{ border + " " }}
                <!-- {{ new Intl.DisplayNames(['en-US'], {type: 'region', fallback: "code"}).of("CAN") }} -->
              </li>
            </div>
          </div>
        </aside>

        <!-- <div>hello from {{ oneCountry }}</div> -->
      </section>

      <article class="flex flex-col">
        <p v-if="!wikiDataSum">{{ wikiDataSum }} Loading...</p>

        <section v-else class="w-full">
          <span class="block w-fit">{{ wikiDataSum.value.extract }}</span>
        </section>
        <!-- <section class="w-[400px]">
          <img
            v-bind:src="oneCountry[0].flags.svg"
            alt=""
            class="object-cover dark:bg-gray-500"
          />
          placeholder for maps
        </section> -->
      </article>
    </main>
  </div>
</template>

<script setup>
const wikiDataSum = ref(false);
const route = useRoute();
console.log(route.params);
const { pending, data: oneCountry } = await useFetch(
  `https://restcountries.com/v3.1/alpha/${route.query.id}`,
  { lazy: true, server: false }
);
const loading = ref(pending);
watch(loading, (loading, prevLoad) => {
  // console.log(prevLoad);
  // console.log(loading);
  // console.log(oneCountry._rawValue[0].name.common);
  // console.log(new Intl.DisplayNames(['en-US'], {type: 'region', fallback: "code"}).of("CAN"))

  const { pending, data: wikiData } = useFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${oneCountry._rawValue[0].name.common}`,
    { lazy: true, server: false }
  );
  watch(pending, (pending, prevPending) => {
    console.log(pending);
    wikiDataSum.value = wikiData;
  });
  // wikiDataSum.value = wikiData;
  console.log(wikiData);
});

// if ((await pending._value) === false) {
//   console.log("pending is false");
//   console.log(await pending);

//   console.log(
//     oneCountry[0].name.nativeName[Object.keys(oneCountry[0].name.nativeName)[0]]
//       .official
//   );
//   const { pending, data: oneCountry } = await useFetch(
//     `https://en.wikipedia.org/api/rest_v1/page/summary//${
//       ooneCountry[0].name.nativeName[
//         Object.keys(oneCountry[0].name.nativeName)[0]
//       ].official
//     }`,
//     { lazy: true, server: false }
//   );
// }
</script>

<style lang="css" scoped>
#info {
  display: block;
  font-weight: 600;
}
.detail {
  font-weight: 300;
}
</style>
