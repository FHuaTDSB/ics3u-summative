<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet">
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped></style>
