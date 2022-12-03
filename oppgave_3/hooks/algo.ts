import { employees } from '../data/employees'
import { faker } from '@faker-js/faker'

const currentOptions : any = {
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


export const feedMap = (employees: any[], map : Map<any, any>, workdays : number, days : any[]) => {
  map.set('all', [])
  for(const employee of employees) {
  //https://regexr.com/ is your friend
  const rulesDays = employee.rules.match(/(?!days:)([\d]+)|\*|even|odd/g)
  if (rulesDays[1] !== undefined && map.has(rulesDays[1])) {
    map
      .get(rulesDays[1])
      .push({ ...employee, count: 0, days: new Map() })
  } else if (rulesDays[1] !== undefined) {
    map.set(rulesDays[1], [{ ...employee, count: 0, days: new Map() }])
  } else {
    map.get('all').push({ ...employee, count: 0, days: new Map() })
  }
}
for(const key of map.keys()){
  for(const employee of map.get(key)){
    for(let i = 0; i < workdays; i++) {
      employee.days.set(days[i], 0)
    }
  }
}
}
  const mapOfEmployees = new Map()
  feedMap(employees, mapOfEmployees, currentOptions.workDays, currentOptions.days)


const getAdditionalEmployees = (listOfEmployees: any[], weekNumber: number, map : Map<any, any>) => {
  for (const key of map.keys()) {
    if (
      key !== 'all' &&
      key !== 'even' &&
      key !== 'odd' &&
      weekNumber % Number(key) === 0
    ) {
      listOfEmployees = [...listOfEmployees, ...map.get(key)]
    }
  }
  return listOfEmployees
}

export const validateBatch = (occourances: number, weekBatch: any[]) => {
  let daysList: Map<String, any> = new Map()
  let usedEmployees: Number[] = []
  for (const week of weekBatch) {
    usedEmployees = []
    for (let day of week) {
      if(usedEmployees.includes(day.employeeId)) {
        return false
      }
      usedEmployees.push(day.employeeId)
      if (
        daysList.has(day.employeeId) &&
        daysList.get(day.employeeId).has(day.name)
      ) {
        daysList
          .get(day.employeeId)
          .set(day.name, daysList.get(day.employeeId).get(day.name) + 1)
      } else {
        daysList.set(day.employeeId, new Map())
        for (const n of week) {
          if (n.name === day.name) {
            daysList.get(day.employeeId).set(day.name, 1)
          } else {
            daysList.get(day.employeeId).set(n.name, 0)
          }
        }
      }
    }
  }
  for (const key of daysList.keys()) {
    for (const name of daysList.get(key).keys()) {
      if (daysList.get(key).get(name) > occourances) {
        return false
      }
    }
  }
  return true
}

export const createLunchList = (options: any, map: Map<any, any>) => {
  let regex = /(?!days:)([\d]+)|\*/g
  const workWeeks: any = []
  let even: any = new Array(...map.get('all'), ...map.get('even'))
  let odd: any = new Array(...map.get('all'), ...map.get('odd'))
  const { vacations, yearSize, workDays, batchSize, maxOccurrences, days } =
    options
  let weekNumber = 0
  for (let i = 0; i < Math.round(yearSize / batchSize)+1; i++) {
    for (const key of map.keys()) {
      for (const person of map.get(key)) {
        for(const day of person.days.keys()) {
          person.days.set(day, 0)
        }
      }
    }
    let batchWeek: any[] = []
    for (let n = 0; n < batchSize; n++) {
      let employeesUsed: String[] = ['random']
      weekNumber++
      let employeeList: any = null
      weekNumber % 2 === 0 ? (employeeList = even) : (employeeList = odd)
      employeeList = getAdditionalEmployees(employeeList, weekNumber, map)
      let week: any = []
      for (let j = 0; j < workDays; j++) {
        if (vacations.includes(weekNumber) || weekNumber > options.yearSize) {
          continue
        }
        let employee = employeeList
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .sort((a: any, b: any) => a.count - b.count)
          .filter(
            (a: any) =>
              String(a.rules.match(/([\d]+)/g)).includes(String(j+1)) ||
              String(a.rules.match(regex)).includes('*')
          )
          .filter((a: any) => !employeesUsed.includes(a.name))
          .filter((a: any) => a.days.get(days[j]) <= maxOccurrences)
          employee[0].count++
          employee[0].days.set(days[j], employee[0].days.get(days[j]) + 1)
        employeesUsed.push(employee[0].name)
        week.push({
          name: days[j],
          employeeId: employee[0].id,
          weekId: weekNumber,
          lunchId: faker.datatype.number({ min: 1, max: 22 }),
        })
      }
      if (weekNumber > options.yearSize) {
        continue
      }
      workWeeks.push(week)
      batchWeek.push(week)
    }
    if (!validateBatch(maxOccurrences, batchWeek)) {
      throw Error('Batch not valid.')
    }
  }
  return workWeeks
}

createLunchList(currentOptions, mapOfEmployees)



