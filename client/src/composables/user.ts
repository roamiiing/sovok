import { trpc } from '@sovok/client/trpc'
import useSWRV from 'swrv'

export const useUser = () => {
  const { data: user, error: userError } = useSWRV($line, () => trpc.me.query())

  return {
    user,
    userError,
  }
}
