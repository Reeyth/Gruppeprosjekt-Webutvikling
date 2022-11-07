import { PrismaClient } from '@prisma/client'
import { employees } from '../data/employees'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()


const fakeFactory = (count: number) => {
  return Array(count)
  .fill(null)
  .map(() => ({
    id: getId(),
    name: findDay(),
    employeeId: faker.datatype.number({ min: 1, max: 15 }),
    weekId: findWeek(),
    lunchId: faker.datatype.number({min: 1, max: foodList.length})
  }))
}
const foodList = ["Pizza", "Spaggethi", "Pasta", "Meatballs", "Salad", "Taco", "Burrito", "Sushi", "Rice", "Chicken", "Fish", "Pork", "Beef", "Lamb", "Pancakes", "Waffles", "Bacon", "Eggs", "Toast", "Bread", "Sandwich", "Soup"]

let days = ['Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday']
let start = 0
const findDay = () => {
  const day = days[days.length-1]
  start++
  days.splice(days.length-1)
  if(start % 5 === 0) {
    days = ['Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday']
    start = 0
  }
  return day
}

const weekDays = Array.from(Array(52).keys()).map((i) => i + 1).reverse()
let count = 0
const findWeek = () => {
  const week = weekDays[weekDays.length-1]
  count++
  if(count % 5 === 0) {
    weekDays.splice(weekDays.length-1)
    count = 0
  }
  return week;
}
let id = 0
const getId = () => {
  id++
  return id
}


async function main() {
  console.log(`Start seeding ...`)
  try {
    
    for(const employee of employees) {
      await prisma.employee.create({
        data: employee
      })
    }

    for(let i = 1; i <= 52; i++) {
      await prisma.week.create({
        data: {
          id: i,
          name: `Week ${i}`
        }
      })
    }

    let foodId = 0
    for(let i = 0; i < foodList.length; i++) {
      await prisma.lunch.create({
        data: {
          id: i+1,
          name: foodList[i]
        }})}

    const days = fakeFactory(52*5)
    for(const day of days) {
      await prisma.day.create({
        data: day
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
