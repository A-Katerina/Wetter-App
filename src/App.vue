<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {watch, ref} from 'vue';
const route = ref(useRoute());


watch(route, (newRoute) => {
  route.value = newRoute;
})



</script>

<template>
  <header class="sticky top-0 z-[1000]">
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

    <div class="wrapper overflow-x-hidden">


      <nav class="bg-white min-h-[50px] w-[100vw] place-content-center flex" :class="{'bg-slate-700' : route.path == '/weather-forecast'}, {'text-white' : route.path == '/weather-forecast' }">
        <div class="flex flex-row place-items-center gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/weather-forecast">Forecast</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <router-view></router-view>

</template>

<style scoped>

</style>
