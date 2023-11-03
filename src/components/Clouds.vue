<template>
{{clouds?.all}}
</template>

<script setup lang="ts">
import type {Weather} from "@/assets/Weather";

defineProps<{clouds: Pick<Weather, 'clouds' | 'wind'>}>()
</script>

<style scoped>

</style>