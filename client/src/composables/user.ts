import { trpc } from '@sovok/client/trpc'
import useSWRV from 'swrv'

export const useMe = () => {
  const { data: user, error: userError } = useSWRV($line, () =>
    trpc.auth.me.query(),
  )

  return {
    user,
    userError,
  }
}
