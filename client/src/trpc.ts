import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { MainRouter } from '@sovok/server'

export const trpc = createTRPCProxyClient<MainRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
})
