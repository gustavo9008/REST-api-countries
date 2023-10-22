<template>
  <div>
    <section class="w-full Psm:min-w-full h-[600px]">
      <div id="map1"></div>
    </section>
  </div>
</template>

<script setup>
var map = reactive({});
const props = defineProps([
  "foundCoord",
  "latLng",
  "loading",
  "clickLink",
  "btnLinkCountryState",
]);
const emit = defineEmits(["deleteMap"]);
let loading = ref(props.loading);
const coordinates = ref(props.foundCoord);

//===== map is loaded when pages is fully loaded on client side, func manual adds css and javascript file into page =====
async function getMapScript() {
  // await findCoors();
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
}
//===== func adds map to page after map css and javascipt file are added to page =====
async function addMapToDom() {
  if ("latlng" in props.latLng.capitalInfo) {
    map = L.map("map1").setView(
      [props.latLng.capitalInfo.latlng[0], props.latLng.capitalInfo.latlng[1]],
      5
    );

    L.marker([
      props.latLng.capitalInfo.latlng[0],
      props.latLng.capitalInfo.latlng[1],
    ])
      .addTo(map)
      .bindPopup(`Capital: ${props.latLng.capital[0]}`)
      .openPopup();
  } else {
    map = L.map("map1").setView(
      [props.latLng.latlng[0], props.latLng.latlng[1]],
      5
    );

    L.marker([props.latLng.latlng[0], props.latLng.latlng[1]]).addTo(map);
  }

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  ).addTo(map);
  L.geoJson(coordinates._rawValue).addTo(map);
  props.btnLinkCountryState.state = false;
}
//===== removes maps from page , is triggered fom either the back btn or user clicks border county =====
async function removeMap() {
  map.remove();
}
//===== after nuxt loads page it logic add add func to remove map to ref data and triggers func to add files to page =====
onNuxtReady(async () => {
  props.clickLink.value = removeMap;
  await getMapScript();
});
//===== delay adding map to page so no error would occured =====
watch(loading, (loading, prevLoading) => {
  setTimeout(() => {
    addMapToDom();
  }, 3000);
});
</script>

<style lang="css" scoped>
#map1 {
  width: 100%;
  height: 100%;
}
</style>
