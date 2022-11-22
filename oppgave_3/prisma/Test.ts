import { employees } from '../data/employees'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const map = new Map()
map.set('all', [])

const feedMap = (employee: any) => {
  //https://regexr.com/ is your friend
  const rulesDays = employee.rules.match(/(?!days:)([\d]+)|\*|even|odd/g)
  if (rulesDays[1] !== undefined && map.has(rulesDays[1])) {
    map.get(rulesDays[1]).push({ ...employee, count: 0 })
    return
  } else if (rulesDays[1] !== undefined) {
    map.set(rulesDays[1], [{ ...employee, count: 0 }])
    return
  }
  map.get('all').push({ ...employee, count: 0 })
}

for (const employee of employees) {
  feedMap(employee)
}

let weeks = []
let j = 0
let employee
let m = 0
let regex = /(?!days:)([\d]+)|\*/g
for (let i = 1; i <= 52; i++) {
  for (let n = 1; n <= 5; n++) {
    j++
    if (i % 2 === 0) {
      if (map.get('even')[map.get('even').length - 1].count <= map.get('all')[map.get('all').length - 1].count) {
        employee = map.get("even").filter((employee : any) => {
            if(employee.count <= map.get("even")[map.get("even").length - 1].count && String(employee.rules.match(regex)).includes(String(n))) {
                return employee
            } else if(employee.count <= map.get("even")[map.get("even").length - 1].count && String(employee.rules.match(regex)).includes('*')) {
                return employee
            }
        })[0]
        employee.count++
      } else {
        employee = map.get("all").filter((employee : any) => {
            if(employee.count <= map.get("all")[map.get("all").length - 1].count && String(employee.rules.match(regex)).includes(String(n))) {
                return employee
            } else if(employee.count <= map.get("all")[map.get("all").length - 1].count && String(employee.rules.match(regex)).includes('*')) {
                return employee
            }
        })[0]
        employee.count++
      }
    } else {
        employee = ""
    }
    weeks.push({ week: i, day: j, dayName: days[n - 1], employee: employee })
  }
}

let e2 = map.get("all").filter((employee : any) => {
    if(employee.count <= map.get("all")[map.get("all").length - 1].count && String(employee.rules.match(regex)).includes(String(1))) {
        return employee
    } else if(employee.count <= map.get("all")[map.get("all").length - 1].count && String(employee.rules.match(regex)).includes('*')) {
        return employee
    }
})
console.log(map)
