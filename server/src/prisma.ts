import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
  datasources: {
    db: {
      url: process.env.SOVOK_DATABASE_URL,
    },
  },
})
