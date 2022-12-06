import { faker } from '@faker-js/faker'
import { Employee, Week, Options } from '../types/index'
import { foodList } from '../data/foodList'

export const feedMap = (employees: any[], map : Map<String | number, any>, workdays : number, days : String[]) => {
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

const getAdditionalEmployees = (listOfEmployees: Employee[], weekNumber: number, map : Map<String | number, any>) => {
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

export const filterList = (list : any, employeesUsed : String[], dayNumber : number, maxOccurrences : number, days : String[]) => {
  let regex = /(?!days:)([\d]+)|\*/
  list = list
  .sort(() => (Math.random() > 0.5 ? 1 : -1))
  .sort((a: Employee, b: Employee) => a.count - b.count)
  .filter(
    (a: Employee) =>
      String(a.rules.match(/([\d]+)/)).includes(String(dayNumber+1)) ||
      String(a.rules.match(regex)).includes('*')
  )
  .filter((a: Employee) => !employeesUsed.includes(a.name))
  .filter((a: any) => a.days.get(days[dayNumber]) < maxOccurrences)
  return list
}


export const createLunchList = (options: Options, map: Map<String | number, any>) => {
  const workWeeks: Week[][] = []
  let even: Employee[] = new Array(...map.get('all'), ...map.get('even'))
  let odd: Employee[] = new Array(...map.get('all'), ...map.get('odd'))
  const { vacations, yearSize, workDays, batchSize, maxOccurrences, days } = options
  let weekNumber = 0
  for (let i = 0; i < Math.round(yearSize / batchSize)+1; i++) {
    for (const key of map.keys()) {
      for (const person of map.get(key)) {
        for(const day of person.days.keys()) {
          person.days.set(day, 0)
        }
      }
    }
    let batchWeek: Week[] = []
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
        let employee : any = filterList(employeeList, employeesUsed, j, maxOccurrences, days)
          employee[0].count++
          employee[0].days.set(days[j], employee[0].days.get(days[j]) + 1)
        employeesUsed.push(employee[0].name)
        week.push({
          name: days[j],
          employeeId: employee[0].id,
          weekId: weekNumber,
          lunchId: faker.datatype.number({ min: 1, max: foodList.length }),

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





