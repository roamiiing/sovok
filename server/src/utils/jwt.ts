import { sign } from 'jsonwebtoken'

export const signToken = (userId: string) => {
  return sign({ userId }, process.env.SOVOK_SERVER_JWT_SECRET!)
}
