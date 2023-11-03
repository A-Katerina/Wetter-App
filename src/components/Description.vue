<template>
<div class="flex place-items-center gap-x-2 flex-wrap">
{{weather?.description[0].toUpperCase() + weather?.description.slice(1)}} <img class="bg-[rgba(255,255,255,0.5)] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.30)] rounded-[100%]" :src=" 'http://openweathermap.org/img/wn/' + weather?.icon +'@2x.png '" />
</div>
</template>

<script setup lang="ts">
import type {Weather} from "@/assets/Weather";
import {store} from "@/assets/Weather";

defineProps<{weather: Pick<Weather, 'weather'>}>()



</script>

<style scoped>

img {

  /*width: 20%;*/

width: 2.5rem;
  height: 2.5rem;

}

</style>