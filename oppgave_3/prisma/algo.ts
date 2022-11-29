import { employees } from '../data/employees'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export const mapOfEmployees = new Map()
mapOfEmployees.set('all', [])

export const feedMap = (employee: any) => {
  //https://regexr.com/ is your friend
  const rulesDays = employee.rules.match(/(?!days:)([\d]+)|\*|even|odd/g)
  if (rulesDays[1] !== undefined && mapOfEmployees.has(rulesDays[1])) {
    mapOfEmployees.get(rulesDays[1]).push({ ...employee, count: 0, occourance: 0 })
    return
  } else if (rulesDays[1] !== undefined) {
    mapOfEmployees.set(rulesDays[1], [{ ...employee, count: 0, occourance: 0 }])
    return
  }
  mapOfEmployees.get('all').push({ ...employee, count: 0, occourance: 0 })
}

for (const employee of employees) {
  feedMap(employee)
}


const getAdditionalEmployees = (listOfEmployees: any[], weekNumber: number) => {
  for (const key of mapOfEmployees.keys()) {
    if (
      key !== 'all' &&
      key !== 'even' &&
      key !== 'odd' &&
      weekNumber % Number(key) === 0
    ) {
      listOfEmployees = [...listOfEmployees, ...mapOfEmployees.get(key)]
    }
  }
  return listOfEmployees
}

export const validateBatch = (occourances : number, weekBatch: any[]) => {
  let usedEmployees : Map<Number, any> = new Map()
  for (const week of weekBatch) {
    for(let day of week) {
      if(usedEmployees.has(day.employeeId)) {
        usedEmployees.set(day.employeeId, usedEmployees.get(day.employeeId) + 1)
      } else {
        usedEmployees.set(day.employeeId, 1)
      }
    }
  }
  for(const key of usedEmployees.keys()) {
    if(usedEmployees.get(key) > occourances) {
      return false
    }
  }
  return true

}

export const createLunchList = (options: any, map : Map<any, any>) => {
  let regex = /(?!days:)([\d]+)|\*/g
  const workWeeks: any = []
  let even: any = new Array(...map.get('all'), ...map.get('even'))
  let odd: any = new Array(...map.get('all'), ...map.get('odd'))
  const { vacations, yearSize, workDays, batchSize, maxOccurrences, days } =
    options
  let weekNumber = 0
  for (let i = 0; i < yearSize / batchSize; i++) {
    for (const key of map.keys()) {
      for (const person of map.get(key)) {
        person.occourance = 0
      }
    }
    let batchWeek : any[] = []
    for (let n = 0; n < batchSize; n++) {
      let employeesUsed: String[] = ['random']
      weekNumber++
      let employeeList: any = null
      n % 2 === 0 ? (employeeList = even) : (employeeList = odd)
      employeeList = getAdditionalEmployees(employeeList, weekNumber)
      let week : any = []
      for (let j = 0; j < workDays; j++) {
        if (vacations.includes(weekNumber)) {
          continue
        }
        employeeList = employeeList
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .sort((a: any, b: any) => a.count - b.count)
          .filter(
            (a: any) =>
              (String(a.rules.match(regex)).includes(String(j + 1)) &&
                a.occourance < maxOccurrences) ||
              (String(a.rules.match(regex)).includes('*') &&
                a.occourance < maxOccurrences)
          )
          .filter((a: any) => !employeesUsed.includes(a.name))
        employeeList[0].count++
        employeeList[0].occourance++
        employeesUsed.push(employeeList[0].name)
        week.push({
          name: days[j],
          employeeId: employeeList[0].id,
          weekId: weekNumber,
          lunchId: faker.datatype.number({ min: 1, max: 22 }),
        })
      }
      workWeeks.push(week)
      batchWeek.push(week)
    }
    if (!validateBatch(maxOccurrences, batchWeek)) {
      throw Error("Batch not valid.")
    }
  }
  return workWeeks
}



const currentOptions = {
  vacations: [8, 28, 29, 30, 31, 32, 40, 52],
  yearSize: 52,
  workDays: 5,
  batchSize: 4,
  maxOccurrences: 4,
  days: [
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
    'Søndag',
  ],
}

const randomizedLunchList = createLunchList(currentOptions, mapOfEmployees)

const prisma = new PrismaClient()
async function main() {
  for (const week of randomizedLunchList) {
    for(const day of week) {
    try {
      await prisma.day.create({
        data: day,
      })
    } catch (e) {
      console.log(e)
    } finally {
      await prisma.$disconnect()
    }
  }}
}
main()

