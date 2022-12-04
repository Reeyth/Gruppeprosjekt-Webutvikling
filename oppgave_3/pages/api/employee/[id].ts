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
                return res.status(400).json({ status: 400, message: 'Id missing' })
            }
            const employee = await prisma.employee.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            if(!employee) {
                return res.status(404).json({ status: 404, message: 'Employee not found' })
            }
            return res.status(200).json({status: 200, data: employee})
        case 'POST':
            return(res.status(405).json({status: 405, message: 'Method not allowed'}))
        case 'PUT':
            const idUser = req.query.id
            if(!idUser) {
                return res.status(400).json({ status: 400, message: 'Id missing' })
            }
            try {
                const data = await prisma.$queryRaw<any>`
                UPDATE Employee
                SET name = ${req.body.name}
                WHERE Employee.id = ${idUser}
                `
                return res.status(200).json(data)
            }
            catch (error) {
                console.error(error)
            }
            finally {
                async () => {
                    await prisma.$disconnect()
                }
            }

        case 'DELETE':
            return(res.status(405).json({status: 405, message: 'Method not allowed'}))
        
    }
}