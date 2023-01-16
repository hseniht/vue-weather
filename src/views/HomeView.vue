<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66]"
        v-if="weatherSearchResults"
      >
        <li
          v-for="searchResult in weatherSearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
        >
          {{ searchResult.place_name }}
        </li>
        <!-- <li v-if="weatherSearchResults" class="py-2 cursor-pointer">
          {{ weatherSearchResults.name }}
        </li> -->
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

//todo: import legit Key from .env file
const openWeatherAPIKey = "test123456";
const mapboxAPIKey = "test0987";

const searchQuery = ref("");
const queryTimeout = ref(null);
const weatherSearchResults = ref(null);
const limit = "5";

const country_code = "+60";

console.log("tk above", searchQuery.value);
const getSearchResults = () => {
  //clear previous timeout whenever we innitiate again
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    //open weather geocode api for latitude and longitude

    if (searchQuery.value !== "") {
      // const geoCodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=${limit}&appid=${openWeatherAPIKey}`;
      // const response = await axios.get(geoCodeAPI);

      // const result = response.data[0];
      // const lat = result.lat;
      // const lon = result.lon;

      // const countryAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}`;
      // const citiesAPI = `https://api.openweathermap.org/data/2.5/find?q=${searchQuery.value}&type=like&sort=population&cnt=30&appid=${openWeatherAPIKey}`;

      // //city current weather data
      // const finalResponse = await axios.get(countryAPI);
      // weatherSearchResults.value = finalResponse.data;
      // console.log("tk final Data", finalResponse.data);

      const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
      );
      weatherSearchResults.value = result.data.features;
      return;
    }
    weatherSearchResults.value = null;
  }, 300);
};
</script>
