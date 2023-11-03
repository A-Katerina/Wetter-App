<template>
<div class="h-full min-h-[calc(100vh-50px)] grid place-items-center bg-animation" :class="Klasse(background)"> <!--{'clouds' : checkClouds(background), 'atmosphere' : checkAtmosphere(background), 'clear' : checkClear(background), 'thunderstorm' : checkThunderstorm(background), 'snow' : checkSnow(background), 'rain' : checkRain(background)} -->

  <div class="">
  <div class=" blurbg rounded-3xl shadow-[-2px_2px_8px_-2px_rgba(0,0,0,0.25)] text-white bg-[rgba(0,0,0,0.5)] lg:min-w-[400px] lg:min-h-[258px] p-4">
  <h1 class="text-2xl m-1">Weather {{store?.name}}</h1>
    <fieldset>
  <input class="border shadow m-1 rounded text-black input-animation" v-model="name" @click="changeValue()" @keydown.enter="getWeatherData()" v-focus/>
  <button class=" px-1 mx-2 border rounded bg-white text-black disabled:bg-gray-300 disabled:border-gray-200" @click="getWeatherData()" :disabled="!name">Search</button> <!-- name != undefined -->
    </fieldset>
  <div class="py-4 mx-1 flex flex-col gap-y-2"  v-if="store != null && locError == undefined">
   <div> Clouds:     <Clouds :clouds="store.clouds"/> % </div>
    <div>Location: <Location :name="store.name"/> </div>
    <div class="flex flex-row gap-x-2 place-items-center"> Weather: <div class="flex md:flex-row flex-col gap-x-5"> <Description v-for="entry in store.weather" :weather="entry" /> </div> </div>
   <div> Wind: <Wind :wind="store.wind"/> m/s </div>
    <div>Temperature: <Temperature :main="store.main" /> C° </div>
    <div>Visibilty: {{store.visibility}} km</div>
  </div>
      <div class="py-4 mx-1" v-if="locError !== undefined">{{locError}}</div>
  </div>
</div>
</div>
</template>

<script setup lang="ts">
import {fetchWeatherData, Klasse, name, locError, store, locName, background} from '../assets/Weather';
import {onMounted, ref, watch} from 'vue';
import Clouds from '../components/Clouds.vue';
import Wind from '../components/Wind.vue';
import Location from '../components/Location.vue';
import Description from '../components/Description.vue';
import Temperature from '../components/Temperature.vue';
const clouds = ref();
const loc = ref();
const weather = ref();
const wind = ref();
const temp = ref();

const vFocus = {
  mounted: (el: any) => el.focus()
}


function getWeatherData() {
  fetchWeatherData().then((response) => { if( !(response instanceof Error) ) {clouds.value = response.clouds.all,
                                        loc.value = response.name,
                                        weather.value = response.weather[0].description,
                                        wind.value = response.wind.speed, console.log(response),
                                        temp.value = response.main.temp,
                                        store.value = response,
                                        background.value = store.value?.weather[0].id,
                                        console.log('bg klicked', background.value);
                                        locError.value = undefined;
                                        name.value = undefined;
                                        } else {
                                        locError.value = response.message,
                                        console.log('lfj', locError.value),
                                        console.log('resp', response),
                                        console.log('store vor undefined', store.value);
                                        //store.value = {};
                                        store.value = undefined;
                                        name.value = undefined;
                                 //       locName.value = name.value;
                                        console.log('name store', store?.value?.name);
                                        }},
                                        locName.value = name.value[0].toUpperCase() + name.value.slice(1),
                                        );


}



onMounted(() => {
  locName.value = name.value;

});

function changeValue() {
  name.value = undefined;
}

/*const oldId = ref(background.value);
const Id = ref();

watch( () => oldId.value, newId => {
  console.log('old', oldId);
  console.log('new', newId);
  Id.value = newId;
});

console.log('asdf', oldId.value);*/



</script>

<style scoped>
.blurbg {
  backdrop-filter: blur(20px);
}

.bg-animation {
  transition: background-image 500ms ease-in-out;
}

/*.input-animation {*/
/*  transition: color 500ms ease-in-out;*/
/*}*/

/*.input-animation:hover {*/
/*  color: red;*/
/*}*/

.clouds {
  /*animation: fadeIn 0.5s;*/
  background-image: url("../assets/background_cloudy.png");
  background-repeat: no-repeat;
  background-size: cover;
}


.atmosphere {
  /*animation: fadeIn2 0.5s;*/
  background-image: url("../assets/background_foggy.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.clear {
  /*animation: fadeIn3 0.5s;*/
  background-image: url("../assets/background_clear.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.thunderstorm {
  /*animation: fadeIn4 0.5s;*/
  background-image: url("../assets/background_thunderstorm.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.snow {
  /*animation: fadeIn5 0.5s;*/
  background-image: url("../assets/background_snowing.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.rain {
  /*animation: fadeIn6 0.5s;*/
  background-image: url("../assets/background_rain.png");
  background-repeat: no-repeat;
  background-size: cover;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeIn2 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeIn3 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeIn4 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeIn5 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeIn6 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>