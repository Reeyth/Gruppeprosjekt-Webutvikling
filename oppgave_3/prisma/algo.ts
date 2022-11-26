import { employees } from '../data/employees'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const map = new Map()
map.set('all', [])

const feedMap = (employee: any) => {
  //https://regexr.com/ is your friend
  const rulesDays = employee.rules.match(/(?!days:)([\d]+)|\*|even|odd/g)
  if (rulesDays[1] !== undefined && map.has(rulesDays[1])) {
    map.get(rulesDays[1]).push({ ...employee, count: 0 })
    return
  } else if (rulesDays[1] !== undefined) {
    map.set(rulesDays[1], [{ ...employee, count: 0}])
    return
  }
  map.get('all').push({ ...employee, count: 0 })
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
        for(const person of even) {
            person.count = 0;
        }
        for(const person of odd) {
            person.count = 0;
        }
        if(vacations.includes(i)) {
            continue
        }
        for(let n = 0; n < batchSize; n++) {
            weekNumber++
            let employeeList : any = null;
            n % 2 === 0 ? employeeList = even : employeeList = odd
            for(let j = 0; j < workDays; j++) {
                employeeList = employeeList.sort(() => Math.random() > 0.5 ? 1 : -1)
                .sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))
                .sort((a : any, b : any) => a.count - b.count)
                .filter((a : any) => String(a.rules.match(regex)).includes(String(j+1)) && a.count < maxOccurrences || String(a.rules.match(regex)).includes('*') && a.count < maxOccurrences)
                employeeList[0].count++
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
