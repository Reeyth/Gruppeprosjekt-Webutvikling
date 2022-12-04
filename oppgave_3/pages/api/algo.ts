import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import settings from '../../data/settings.json'
import { feedMap, createLunchList } from '../../hooks/algo'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const mapOfEmployees = new Map()
    const options = settings.settingsJson.settings
    const employees = await prisma.employee.findMany()
    feedMap(employees, mapOfEmployees, options.workDays, options.days)
    try {
        await prisma.day.deleteMany()
      await prisma.$queryRaw`
        DELETE FROM sqlite_sequence
        WHERE name = 'Day'`
      const weeks = createLunchList(options, mapOfEmployees)
      for (const week of weeks) {
        for (const day of week) {
          await prisma.day.create({
            data: day,
          })
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      ;async () => {
        await prisma.$disconnect()
      }
    }
    res.status(200).json({ success: true, message: 'Success' })
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' })
  }
}
