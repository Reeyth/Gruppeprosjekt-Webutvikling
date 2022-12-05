import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import settings from '../../data/settings.json'
import { employees } from '../../data/employees'
import { feedMap, createLunchList } from '../../hooks/algo'
import { foodList } from '../../data/foodList'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {

    const mapOfEmployees = new Map()
    const options = settings.settingsJson.defaultSettings
    feedMap(employees, mapOfEmployees, options.workDays, options.days)

    try {
      await prisma.$queryRaw`DELETE FROM "Day"`
      await prisma.$queryRaw`DELETE FROM "Lunch"`
      await prisma.$queryRaw`DELETE FROM "Week"`
      await prisma.$queryRaw`DELETE FROM "Employee"`
      await prisma.$queryRaw`DELETE FROM "Overwrite"`

      await prisma.$queryRaw`
            DELETE FROM sqlite_sequence;`
      for (let i = 1; i <= 52; i++) {
        await prisma.week.create({
          data: {
            id: i,
            name: `Week ${i}`,
          },
        })
      }
      let foodId = 0
      for (let i = 0; i < foodList.length; i++) {
        await prisma.lunch.create({
          data: {
            id: i + 1,
            name: foodList[i],
          },
        })
      }
      for (const employee of employees) {
        await prisma.employee.create({
          data: employee,
        })
      }
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

    console.log('The database has been reset')

    res.status(200).json({ success: true, message: 'Success' })
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' })
  }
}
