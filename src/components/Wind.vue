<template>
{{wind?.speed}}
</template>

<script setup lang="ts">
import type {Weather} from "@/assets/Weather";

defineProps<{wind: Pick<Weather, 'wind'>}>()
</script>

<style scoped>

</style>