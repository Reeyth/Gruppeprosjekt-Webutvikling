import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import settings from '../../data/settings.json'
import { employees } from '../../data/employees'
import { feedMap, createLunchList } from '../../hooks/algo'


const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const mapOfEmployees = new Map()
        mapOfEmployees.set('all', [])
        for (const employee of employees) {
        feedMap(employee, mapOfEmployees)
        }
        const options = settings.settingsJson.defaultSettings
        const weeks = createLunchList(options, mapOfEmployees)
        try {
            await prisma.$queryRaw`
            DELETE FROM Day;`
            await prisma.$queryRaw`
            DELETE FROM sqlite_sequence;`
            for(const week of weeks) {
                for(const day of week) {
                    await prisma.day.create({
                        data: day
                    })
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            async () => {
                await prisma.$disconnect()
            }
        }
        res.status(200).json({ message: 'Success' })
    }
    if (req.method === 'POST') {
        res.status(400).json({ message: 'Bad request' })
    }
}
