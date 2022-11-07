import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
    if(req.method === 'GET') {
      try {
        const weekId = req.query.id
        if(!weekId) {
            return res.status(400).json({ status: 400, message: 'Id missing' })
        }
        const data = await prisma.$queryRaw<any>`
          SELECT 
          Employee.name as Employee_Name, Day.name as day, Lunch.name as lunch, Day.id
          FROM Employee
          INNER JOIN Day ON Employee.id = Day.employeeId
          INNER JOIN Week ON Day.weekId = Week.id
          INNER JOIN Lunch ON Day.lunchId = lunch.id
          WHERE Week.id = ${weekId}
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
}