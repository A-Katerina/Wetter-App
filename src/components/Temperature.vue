<template>
{{main?.temp}}
</template>

<script setup lang="ts">
import type {Weather} from "@/assets/Weather";

defineProps<{main: Pick<Weather, 'main'>}>()
</script>

<style scoped>

</style>