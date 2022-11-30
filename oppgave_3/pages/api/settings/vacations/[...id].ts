import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { settings, writeSettings } from '../../../../data/settings'
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

      if(!vacationId) {
          return res.status(400).json({ success: false, message: 'Id missing' })
      }

      const id = parseInt(vacationId[0])

      if(id > 52 || id < 1) {
          return res.status(400).json({ success: false, message: 'Id out of range (1-52)' })
      }

      if(settings.vacations.includes(id)) {
          return res.status(400).json({ success: false, message: 'Vacation already exists' })
      }

      settings.vacations.push(id)
      settings.vacations.sort((a, b) => a - b)
      
      writeSettings()

      res.status(200).json({ success: true, data: settings.vacations })
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

      if(!vacationId) {
          return res.status(400).json({ success: false, message: 'Id missing' })
      }

      const id = parseInt(vacationId[0])

      if(id > 52 || id < 1) {
          return res.status(400).json({ success: false, message: 'Id out of range (1-52)' })
      }

      if(!settings.vacations.includes(id)) {
        return res.status(400).json({ success: false, message: 'Vacation does not exists' })
      }

      settings.vacations.splice(settings.vacations.indexOf(id), 1)

      writeSettings()

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