import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { name, rules } = req.body
    try {
        const employee = await prisma.employee.create({
            data: {
            name: name,
            rules: rules
            },
        })
        if(!employee) {
            res.status(400).json({ message: 'Error creating employee' })
        } else {
            res.status(200).json({ employee })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    } finally {
        await prisma.$disconnect()
    }
}