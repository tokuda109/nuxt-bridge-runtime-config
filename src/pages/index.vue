<template>
  <!-- <p>{{ buildNumber }}</p> -->
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

console.log(runtimeConfig)
// const buildNumber = runtimeConfig.public.build.number;
</script>