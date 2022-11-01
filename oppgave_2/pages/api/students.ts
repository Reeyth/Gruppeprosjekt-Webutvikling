import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    try {
      const students = await prisma.student.findMany()
      return res.status(200).json(students)
    } catch (error) {
      res.status(500).json({ message: error })
    } finally {
      ;async () => {
        await prisma.$disconnect()
      }
    }
  }
}
