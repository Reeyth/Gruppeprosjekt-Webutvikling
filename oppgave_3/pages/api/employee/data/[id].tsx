import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toUpperCase()) {
    case 'GET':
      const { id }: any = req.query
      if (!id) {
        return res.status(400).json({ status: 400, message: 'Id missing' })
      }
      try {
        const employee = await prisma.$queryRaw<any>`
            SELECT 
            Employee.id as employee_id, Employee.name as employee_name, Day.name as day, Lunch.name as lunch_type, Day.id as id, Day.weekId as week_number
            FROM Employee
            INNER JOIN Day ON Employee.id = Day.employeeId
            INNER JOIN Lunch ON Day.lunchId = lunch.id
            WHERE Employee.id = ${id}
            ORDER BY Day.weekId ASC
        `
        if (!employee) {
          return res
            .status(404)
            .json({ status: 404, message: 'Employee not found' })
        }
        return res.status(200).json({ status: 200, data: employee })
      } catch (error) {
        console.error(error)
        return res
          .status(500)
          .json({ status: 500, message: 'Internal server error' })
      } finally {
        await prisma.$disconnect()
      }
    case 'POST':
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed' })
    case 'PUT':
      const idUser = req.query.id
      if (!idUser) {
        return res
          .status(400)
          .json({ status: 400, message: 'Det skjedde en feil. Id mangler.' })
      }

      if (!req.body.name || req.body.name === '') {
        return res.status(400).json({ status: 400, message: 'Navn mangler' })
      }

      try {
        const data = await prisma.$queryRaw<any>`
                UPDATE Employee
                SET name = ${req.body.name}
                WHERE Employee.id = ${idUser}
                `
        return res
          .status(200)
          .json({
            status: 200,
            data: data,
            message: 'Ansatt oppdatert med nytt navn',
          })
      } catch (error) {
        console.error(error)
        return res
          .status(500)
          .json({ status: 500, message: 'Internal server error' })
      } finally {
        ;async () => {
          await prisma.$disconnect()
        }
      }

    case 'DELETE':
      return res
        .status(405)
        .json({ status: 405, message: 'Method not allowed' })
  }
}
