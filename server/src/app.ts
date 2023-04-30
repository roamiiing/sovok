import express from 'express'
import { createExpressMiddleware as createTRPCMiddleware } from '@trpc/server/adapters/express'
import { expressHandler as trpcPlayground } from 'trpc-playground/handlers/express'
import { mainRouter } from './main-router'

const TRPC_ENDPOINT = '/api/trpc'
const TRPC_PLAYGROUND_ENDPOINT = '/'

;(async () => {
  const app = express()

  const playgroundMiddleware = await trpcPlayground({
    trpcApiEndpoint: TRPC_ENDPOINT,
    playgroundEndpoint: TRPC_PLAYGROUND_ENDPOINT,
    router: mainRouter,
  })

  const trpcMiddleware = createTRPCMiddleware({
    router: mainRouter,
  })

  app.use(TRPC_ENDPOINT, trpcMiddleware)
  app.use(TRPC_PLAYGROUND_ENDPOINT, playgroundMiddleware)

  app.listen(3000, () => {
    console.log(`
🚀 Server ready at:    http://localhost:3000
   TRPC playground:    http://localhost:3000${TRPC_PLAYGROUND_ENDPOINT}
`)
  })
})()
