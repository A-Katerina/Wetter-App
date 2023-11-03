<template>
{{name}}
</template>

<script setup lang="ts">
import type {Weather} from "@/assets/Weather";

defineProps<{name: string}>() //weil ich kein objekt mit string übergebe, sondern nur einen string
</script>

<style scoped>

</style>