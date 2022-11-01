import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const groups = ["Informasjonssystemer", "Informatikk", "Digitale medier og design"]

const fakeFactory = (count: number) => {
  return Array(count)
  .fill(null)
  .map(() => {
    return {
      id: faker.git.commitSha(),
      name: faker.name.firstName(),
      gender: faker.name.sexType(),
      age: faker.datatype.number({
        'min': 18,
        'max': 50
      }),
      group: groups[Math.floor(Math.random() * groups.length)]
    }
  })
}



async function main() {
  console.log(`Start seeding ...`)
  try {
    const students = fakeFactory(50)
    for(const student of students) {
      await prisma.student.create({
        data: student
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

