<template>
  <p>{{ baseUrl }}</p>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

console.log(runtimeConfig);

const baseUrl = process.env.BASE_URL || runtimeConfig.public.baseUrl;
</script>