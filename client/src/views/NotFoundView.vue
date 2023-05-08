<script setup lang="ts">
  import BaseTypography from '@sovok/client/components/BaseTypography.vue'
  import errorGif from '@sovok/client/assets/error.gif'
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <BaseTypography class="w-full text-center">
      <span>(⇀‸↼‶)</span>

      <h1>Не найдено</h1>

      <p>
        Запрашиваемая страница не найдена. Возможно, вы ввели неправильный адрес
        или страница была удалена.
      </p>

      <img class="mx-auto" :src="errorGif" />

      <RouterLink to="/">Вернуться на главную</RouterLink>
    </BaseTypography>
  </div>
</template>
