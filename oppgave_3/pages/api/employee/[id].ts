import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
    switch (req.method?.toUpperCase()) {
        case 'GET':
            const {id} = req.query
            if(!id) {
                return res.status(400).json({ status: false, message: 'Id missing' })
            }
            const employee = await prisma.employee.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            if(!employee) {
                return res.status(404).json({ status: false, message: 'Employee not found' })
            }
            return res.status(200).json({status: true, data: employee})
        case 'POST':
            console.log("post")
        case 'PUT':
            console.log("put")
        case 'DELETE':
            console.log("delete")
        
    }
}