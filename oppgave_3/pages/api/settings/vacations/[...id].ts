import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { settings } from '../../../../data/settings'
import { runInNewContext } from 'vm'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === 'GET') {
    try {
      const id = req.query.id

      if (!id) {
        return res.status(400).json({ status: 400, message: 'Id missing' })
      }

      const data =
        settings.vacations[settings.vacations.indexOf(parseInt(id[0]))]

      return res.status(200).json(JSON.parse(data))
    } catch (error) {
      console.error(error)
    } finally {
      ;async () => {
        await prisma.$disconnect()
      }
    }
  } else if (req.method === 'POST') {
    try {
      const vacationId = req.query.id
      if (!vacationId) {
        return res.status(400).json({ status: 400, message: 'Id missing' })
      }

      if(parseInt(vacationId[0]) > 52 || parseInt(vacationId[0]) < 1) {
        return res.status(400).json({ status: 400, message: 'Id out of range (1-52)' })
      }

      if(settings.vacations.includes(parseInt(vacationId[0]))) {
        return res.status(400).json({ status: 400, message: 'Vacation already exists' })
      }

      settings.vacations.push(parseInt(vacationId[0]))
      settings.vacations.sort((a, b) => a - b)

      return res.status(200).json({ status: 200, data: settings.vacations, message: 'Vacation added' })
    } catch (error) {
      console.error(error)
    } finally {
      ;async () => {
        await prisma.$disconnect()
      }
    }
  } else if (req.method === 'DELETE') {

    try {
      const vacationId = req.query.id
      if (!vacationId) {
        return res.status(400).json({ status: 400, message: 'Id missing' })
      }

      if(parseInt(vacationId[0]) > 52 || parseInt(vacationId[0]) < 1) {
        return res.status(400).json({ status: 400, message: 'Id out of range (1-52)' })
      }

      if(!settings.vacations.includes(parseInt(vacationId[0]))) {
        return res.status(400).json({ status: 400, message: 'Vacation does not exists' })
      }

      settings.vacations.splice(settings.vacations.indexOf(parseInt(vacationId[0])), 1)

      return res.status(200).json({ status: 200, data: settings.vacations, message: 'Vacation deleted' })
    } catch (error) {
      console.error(error)
    } finally {
      ;async () => {
        await prisma.$disconnect()
      }
    }
  }
}
