import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.$queryRaw<any>`
        SELECT Employee.id, Employee.name, rules, COUNT(lunchId) as "count"
        FROM Employee, Day
        WHERE Employee.id = Day.employeeId
        GROUP BY Employee.id
        `

        /*
        The count column was returned as a bigint by the query above, which apparently is not supported by the JSON.stringify function, so I had to convert it to a number.
        */
        const data2 = data.map((item: any) => {
          return {
            ...item,
            count: Number(item.count)
          }
        })

      return res.status(200).json({success: true, data: data2})
    } catch (error) {
      console.error(error)
    } finally {
      async () => {
        await prisma.$disconnect()
      }
    }
  } else {
    return res.status(400).json({ success: false, message: 'Bad request' })
  }
}
