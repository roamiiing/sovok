import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

const verifyToken = (token: string) => {
  try {
    const verified = verify(token, process.env.SOVOK_SERVER_JWT_SECRET!)

    if (
      typeof verified === 'object' &&
      Object.prototype.hasOwnProperty.call(verified, 'userId') &&
      typeof verified.userId === 'string'
    ) {
      return verified as { userId: string }
    }
  } finally {
    return null
  }
}

export type AuthenticationMiddlewareDeps = {
  prisma: PrismaClient
}

export const authenticationMiddleware =
  ({ prisma }: AuthenticationMiddlewareDeps) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization?.replace('Bearer ', '')

    if (!jwtToken) return next()

    const verified = verifyToken(jwtToken)

    if (!verified) {
      res.setHeader('Authorization', '')
      return next()
    }

    const user = await prisma.user.findUnique({
      select: { id: true, name: true, email: true },
      where: { id: verified.userId },
    })

    if (!user) {
      res.setHeader('Authorization', '')
      return next()
    }

    res.locals.user = user

    return next()
  }
