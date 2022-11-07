import { PrismaClient } from '@prisma/client'
import { employees } from '../data/employees'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  try {
    for(const employee of employees) {
      await prisma.employee.create({
        data: employee
      })
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
