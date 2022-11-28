import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method === 'GET') {
    try {
      const data = await prisma.$queryRaw<any>`
        SELECT 
          *
        FROM Employee

  `
    return res.status(200).json(data)
    } catch (error) {
      console.error(error)
    } finally {
      async () => {
        await prisma.$disconnect()
      }
    }
  } 
  else {
    return res.status(400).json({ success: false, message: 'Bad request' })
  }
}
