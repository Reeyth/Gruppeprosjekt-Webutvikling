import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type Student = {
  id: string
  name: string;
  gender: string;
  age: number;
  group: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method === 'GET') {
    const students = await prisma.student.findMany()
    return res.status(200).json({ success: true, data: [...students] })

}}
