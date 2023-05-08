<script setup lang="ts">
  import { useAuthStore } from '@sovok/client/composables/auth'
  import { SignInInput, SignInOutputType } from '@sovok/shared'
  import { NButton, NForm, NFormItem, NInput, useNotification } from 'naive-ui'
  import { ref } from 'vue'

  const signInData = ref<SignInInput>({
    email: '',
    password: '',
  })

  const { signIn } = useAuthStore()
  const notification = useNotification()

  const submitForm = async () => {
    const result = await signIn(signInData.value)

    if (result.type === SignInOutputType.InvalidCredentials) {
      notification.error({
        duration: 5000,
        title: 'Неверные данные',
        description:
          'Проверьте правильность введенных данных и повторите попытку',
      })
    }
  }
</script>

<template>
  <NForm @submit.prevent="submitForm">
    <NFormItem label="E-mail" required>
      <NInput v-model:value="signInData.email" placeholder="Введите e-mail" />
    </NFormItem>
    <NFormItem label="Пароль" required>
      <NInput
        v-model:value="signInData.password"
        type="password"
        placeholder="Введите пароль"
      />
    </NFormItem>

    <NButton class="w-full" type="primary" attr-type="submit"> Войти </NButton>
  </NForm>
</template>
