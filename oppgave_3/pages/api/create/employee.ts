import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
    const { name, rules } = req.body
    console.log(name, rules)
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
}