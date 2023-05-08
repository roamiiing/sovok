import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import useSWRV from 'swrv'
import { SignInInput, SignInOutputType, SignUpInput } from '@sovok/shared'
import { trpc } from '@sovok/client/trpc'

export const useAuthStore = defineStore($line, () => {
  const token = useLocalStorage<string | null>('sovok-auth-token', () => null)

  const {
    data: user,
    error: userError,
    mutate: refetchUser,
  } = useSWRV($line, () => trpc.auth.me.query())

  const signIn = async (input: SignInInput) => {
    const res = await trpc.auth.signIn.mutate(input)

    if (res.type === SignInOutputType.Success) {
      token.value = res.credentials.jwt
      refetchUser()
    }

    return res
  }

  const signUp = async (input: SignUpInput) => {
    const res = await trpc.auth.signUp.mutate(input)

    return res
  }

  const logout = () => {
    token.value = null
    refetchUser()
  }

  return {
    token,
    user,
    userError,
    signIn,
    signUp,
    logout,
    refetchUser,
  }
})
