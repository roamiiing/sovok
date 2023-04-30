<script setup lang="ts">
  import { hello } from '@sovok/shared'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-2">
    {{ hello }}
  </div>
</template>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
