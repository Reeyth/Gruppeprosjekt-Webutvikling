import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === 'GET') {
    try {
      const name = req.query.name
      if (!name) {
        return res.status(200).json({ success: true, message: 'Navn på ansatt mangler' })
      }
      const data = await prisma.$queryRaw<any>`
        SELECT 
        Employee.name as employee_name, Day.name as day, Lunch.name as lunch_type, Day.id as id, Day.weekId as week_number
        FROM Employee
        INNER JOIN Day ON Employee.id = Day.employeeId
        INNER JOIN Lunch ON Day.lunchId = lunch.id
        WHERE Employee.name like ${name}
        ORDER BY Day.weekId ASC
      `

      if(data.length == 0) {
        return res.status(200).json({ success: true, data: data, message: 'Ingen ansatte med dette navnet' })
      }
      
      return res.status(200).json({ success: true, data: data})
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Bad request' })
      console.error(error)
    } finally {
      ;async () => {
        await prisma.$disconnect()
      }
    }
  }
}
