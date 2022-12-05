import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fetchEmployee = async (name: string) => {
  const employee = await prisma.$queryRaw<any>`
  SELECT 
  Employee.id as employee_id, Employee.name as employee_name, Day.name as day, Lunch.name as lunch_type, Day.id as id, Day.weekId as week_number
  FROM Employee
  INNER JOIN Day ON Employee.id = Day.employeeId
  INNER JOIN Lunch ON Day.lunchId = lunch.id
  WHERE Employee.name like ${name}
  ORDER BY Day.weekId ASC
`
  return employee
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const name = req.query.name

      if (name !== undefined) {
        const employee = await fetchEmployee(name as string).finally(
          async () => {
            await prisma.$disconnect()
          }
        )

        if (employee.length === 0) {
          res.status(200).json({
            success: false,
            message: 'Fant ingen ansatte med dette navnet',
            data: [],
          })
        } else {
          res.status(200).json({ success: true, data: employee })
        }
      } else {
        res.status(200).json({
          success: false,
          message: 'Du må skrive inn et navn',
          data: [],
        })
      }
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
