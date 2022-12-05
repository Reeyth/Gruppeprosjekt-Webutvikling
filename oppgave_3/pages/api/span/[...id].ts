import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET') {
      try {
        const weekId : any = req.query.id

        if(!weekId) {
            return res.status(400).json({ status: 400, message: 'Id missing' })
        }

        /* Checking if the first value is larger than the second value,
        if so, swap the values. This ensures that the first value is always
        the smaller value. */
        if(Number(weekId[0]) > Number(weekId[1])) {
            const temp = weekId[0]
            weekId[0] = weekId[1]
            weekId[1] = temp
        }

        const data = await prisma.$queryRaw<any>`
        SELECT 
        Employee.name as employee_name, Day.name as day, Lunch.name as lunch_type, Day.id as id, Day.weekId as week_number
        FROM Employee
        INNER JOIN Day ON Employee.id = Day.employeeId
        INNER JOIN Week ON Day.weekId = Week.id
        INNER JOIN Lunch ON Day.lunchId = lunch.id
        WHERE Week.id BETWEEN ${weekId[0]} AND ${weekId[1]}
    `
      return res.status(200).json(data)
      } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, message: 'Internal server error' })
      } finally {
        async () => {
          await prisma.$disconnect()
        }
      }
    }
}