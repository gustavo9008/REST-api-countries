// export const useCounter = () => useState("counter", () => 0);
export var countries = reactive({
  region: "North America",
  loadedCountries: {},
  selectedCountry: null,
  loading: true,
  darkTheme: true
});
