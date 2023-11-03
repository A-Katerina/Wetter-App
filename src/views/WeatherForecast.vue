<template>
  <div class="h-full min-h-[calc(100vh-50px)] grid place-items-center my-4">
    <div v-if="storeForecast != undefined && locError == undefined">
    <fieldset class="flex place-content-center">
    <div>
      <input class="border shadow m-1 rounded text-black" v-model="name" @click="changeValue()" @keydown.enter="getForecast()" v-focus />
      <button class="px-1 mx-2 border rounded bg-white text-black disabled:bg-gray-300 disabled:border-gray-200" @click="getForecast()" :disabled="!name">Search</button> <!-- name != undefined -->
    </div>
    </fieldset>
<!--erstes v-for für jedes objekt im list-array-->
    <div v-for="listItem in storeForecast?.list">
      <div class="rounded-xl border p-4 my-4" :class="bgColor(new Date(listItem.dt_txt).getHours())">
        <div class="flex flex-row flex-nowrap"><div> Date: {{days[new Date(listItem.dt_txt).getDay()]}} - {{months[new Date(listItem.dt_txt).getMonth()]}} </div> <div class="flex flex-row">&nbsp;{{new Date(listItem.dt_txt).getDate()}} <div class="text-[0.625rem]"> {{ending(new Date(listItem.dt_txt).getDate())}}</div></div>&nbsp;<div>{{new Date(listItem.dt_txt).getFullYear()}}, {{new Date(listItem.dt_txt).getHours()%12 || 12}} {{time(new Date(listItem.dt_txt).getHours())}}</div> </div>  <!--{{entry.dt_txt.slice(11, entry.dt_txt.length-3)}}-->  <!--{{entry.dt_txt.slice(0,10)}}-->
        <div> Clouds:     {{listItem.clouds.all}} % </div>
        <div>Location: {{storeForecast.city.name}} </div>
        <div>Weather:
          <!--zweites v-for für jedes objekt in weather von dem list-objekt das ausgegeben wird -->
            <div v-for="weatherItem in listItem.weather">
              {{weatherItem.description}}
            </div>
        </div> <!--{{entry?.weather[0].description}}-->
        <div> Wind: {{listItem.wind.speed}} m/s </div>
        <div>Temperature: {{listItem.main.temp}} C° </div>
        <div>Visibilty: {{listItem.visibility}} km</div>
      </div>
    </div>
  </div>
    <div :class="loadingIcon()" v-if="complete == false"></div> <!--storeForecast == undefined && locError == undefined-->
    <div class="py-4 mx-1 flex flex-col place-items-center" v-if="locError !== undefined">
      {{locError}}
      <fieldset class="flex place-content-center">
        <div>
          <input class="border shadow m-1 rounded text-black" v-model="name" @click="changeValue()" @keydown.enter="getForecast()" v-focus />
          <button class="px-1 mx-2 border rounded bg-white text-black disabled:bg-gray-300 disabled:border-gray-200" @click="getForecast()" :disabled="!name">Search</button> <!-- name != undefined -->
        </div>
      </fieldset>
    </div>
  </div>

</template>

<script setup lang="ts">
import {storeForecast, name, getForecast, locError, complete} from '../assets/forecast';
import {ref} from 'vue';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/*fetchForecast().then(response => {storeForecast.value = response, console.log(storeForecast.value)});*/
//fetchForecast().then(response => {storeForecast.value = response, time.value = new Date(storeForecast?.value?.list[0].dt)});

const vFocus = {
  mounted: (el: any) => el.focus()
}


console.log(storeForecast.value);

function changeValue() {
  name.value = undefined;
}

function time(hours: number) {
  if (hours < 12){
    return 'a.m.'
  } else {
    return 'p.m.' }
}

function loadingIcon(){
  if (new Date().getHours() >= 6 && new Date().getHours() <= 19) {
    return 'loading-sun';
  } else {
    return 'loading-moon';
  }
}

function ending(hours: number){
  if (hours == 1 || hours == 21 ) {
    return 'st';
  } else if (hours == 2 || hours == 22 ){
    return 'nd'
  } else if (hours == 3 || hours == 23 ){
    return 'rd'
  } else {
    return 'th'
  }
}

function bgColor(hour: number){
  if(hour >= 6 && hour <=9 || hour >= 19 && hour <=20 ) {
    return 'bg-orange-500'
  } if (hour >= 10 && hour <= 18) {
    return 'bg-yellow-500'
  } else {
    return 'bg-blue-800'
  }
}


</script>

<style scoped>

.loading-sun {
  background-image: url('../assets/sun.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 150px;
  width: 150px;
  transform: rotate(360deg);
  animation: rotate-sun 1s infinite ease-in-out;
}

@keyframes rotate-sun {
  0% {rotate: 0deg}
  100% {rotate: 360deg}
}

.loading-moon {
  background-image: url('../assets/moon.webp');
  background-repeat: no-repeat;
  background-size: cover;
  height: 70px;
  width: 70px;
  transform: rotate(360deg);
  animation: rotate-moon 1s infinite ease-in-out;
}

@keyframes rotate-moon {
  0% {rotate: 0deg}
  100% {rotate: 360deg}
}

</style>