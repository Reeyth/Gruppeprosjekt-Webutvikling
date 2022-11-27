import { employees } from '../data/employees'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const map = new Map()
map.set('all', [])

const feedMap = (employee: any) => {
  //https://regexr.com/ is your friend
  const rulesDays = employee.rules.match(/(?!days:)([\d]+)|\*|even|odd/g)
  if (rulesDays[1] !== undefined && map.has(rulesDays[1])) {
    map.get(rulesDays[1]).push({ ...employee, count: 0, occourance: 0 })
    return
  } else if (rulesDays[1] !== undefined) {
    map.set(rulesDays[1], [{ ...employee, count: 0, occourance: 0 }])
    return
  }
  map.get('all').push({ ...employee, count: 0, occourance: 0 })
}

for (const employee of employees) {
  feedMap(employee)
}
let regex = /(?!days:)([\d]+)|\*/g
const workWeeks : any = []
const createLunchList = (options: any) => {
    let even : any = new Array(...map.get("all"), ...map.get("even"))
    let odd : any = new Array(...map.get("all"), ...map.get("odd"))
    const { vacations, yearSize, workDays, batchSize, maxOccurrences, days } = options
    let weekNumber = 0
    for(let i = 0; i <= yearSize/batchSize; i++) {
        for(const key of map.keys()) {
            for(const person of map.get(key)) {
                person.occourance = 0
            }
        }
        for(let n = 0; n < batchSize; n++) {
            let employeesUsed : String[] = ["random"]
            weekNumber++
            let employeeList : any = null;
            n % 2 === 0 ? employeeList = even : employeeList = odd
            for(const key of map.keys()) {
                if(key !== "all" && key !== "even" && key !== "odd" && weekNumber % Number(key) === 0) {
                    employeeList = [...employeeList, ...map.get(key)]
                }
            }
            for(let j = 0; j < workDays; j++) {
                if(vacations.includes(weekNumber)) {
                    continue
                }
                employeeList = employeeList.sort(() => Math.random() > 0.5 ? 1 : -1)
                .sort((a : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Math.random() > 0.5 ? -1 : -2 : 1 ))
                .sort((a : any, b : any) => a.count - b.count)
                .filter((a : any) => String(a.rules.match(regex)).includes(String(j+1)) && a.occourance < maxOccurrences || String(a.rules.match(regex)).includes('*') && a.occourance < maxOccurrences)
                .filter((a : any) => !employeesUsed.includes(a.name))
                employeeList[0].count++
                employeeList[0].occourance++
                employeesUsed.push(employeeList[0].name)
                workWeeks.push({
                    name: days[j], 
                    employeeId: employeeList[0].id, 
                    weekId: weekNumber,
                    lunchId: faker.datatype.number({min: 1, max: 22})
                }) 
            }
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
  ]
}
const randomizedLunchList = createLunchList(currentOptions)

const prisma = new PrismaClient()
async function main() {
    for(const lunchDay of randomizedLunchList) {
        try {
            await prisma.day.create({
                data: lunchDay
            })
        } catch(e) {
            console.log(e)
        } finally {
            await prisma.$disconnect()
        }
    }
}
main()

