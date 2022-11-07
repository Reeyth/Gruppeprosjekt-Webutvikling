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
        Employee.id as Employee_id, Employee.name as Employee_Name, Employee.rules as rules,
        Week.name as week, Day.name as day, Lunch.name as lunch
        FROM Employee
        INNER JOIN Day ON Employee.id = Day.employeeId
        INNER JOIN Week ON Day.weekId = Week.id
        INNER JOIN Lunch ON Day.lunchId = lunch.id
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
