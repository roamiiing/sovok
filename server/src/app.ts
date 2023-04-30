import express from 'express'
import cors from 'cors'
import { createExpressMiddleware as createTRPCMiddleware } from '@trpc/server/adapters/express'
import { expressHandler as trpcPlayground } from 'trpc-playground/handlers/express'
import { mainRouter } from './main-router'
import { resolve } from 'path'

const IS_DEV = process.env.NODE_ENV === 'development'

const TRPC_ENDPOINT = '/api/trpc'
const TRPC_PLAYGROUND_ENDPOINT = '/api/playground'

const STATIC_PATH = resolve(__dirname, '../client') // relative to the {root}/dist/server

const PORT = parseInt(process.env.SOVOK_SERVER_PORT || '3000', 10)

;(async () => {
  const app = express()

  app.use(cors())

  if (!IS_DEV) app.use(express.static(STATIC_PATH))

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

  const server = app.listen(PORT, () => {
    const address = server.address()
    const stringAddress =
      typeof address === 'string' ? address : `http://localhost:${PORT}`

    console.log(`
🚀 Server ready at:    ${stringAddress}
   TRPC playground:    ${stringAddress}${TRPC_PLAYGROUND_ENDPOINT}
    `)
  })
})()
