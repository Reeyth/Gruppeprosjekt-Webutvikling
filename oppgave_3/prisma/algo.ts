import { employees } from '../data/employees'

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
    let even : any = new Array(...map.get("all"), ...map.get("even")).sort(() => Math.random() > 0.5 ? 1 : -1)
    let odd : any = new Array(...map.get("all"), ...map.get("odd")).sort(() => Math.random() > 0.5 ? 1 : -1)
    const { vacations, yearSize, workDays, batchSize, maxOccurrences, days } = options
    let weekNumber = 0
    for(let i = 0; i < yearSize/batchSize; i++) {
        for(const person of even) {
            person.count = 0;
        }
        for(const person of odd) {
            person.count = 0;
        }
        if(vacations.includes(i)) {
            workWeeks.push(null)
            continue
        }
        for(let n = 1; n <= batchSize; n++) {
            weekNumber++
            let employeeList : any = null;
            n % 2 === 0 ? employeeList = even : employeeList = odd
            for(let j = 0; j < workDays; j++) {
                employeeList = employeeList.sort(() => Math.random() > 0.5 ? 1 : -1)
                .sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))
                .sort((a : any, b : any) => a.count - b.count)
                .filter((a : any) => String(a.rules.match(regex)).includes(String(j+1)) && a.count < maxOccurrences || String(a.rules.match(regex)).includes('*') && a.count < maxOccurrences)
                employeeList[0].count++
                workWeeks.push({week: weekNumber, day: days[j], employee: employeeList[0]}) 
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
console.log(createLunchList(currentOptions))

//randomizer mappet til employees og sorterer etter regler for å prioritere dem.
let e2 = map.get("all").sort(() => Math.random() > 0.5 ? 1 : -1)
//filtrer ut basert på regler for å prioritere dem. og følge algoen. tilegg har med de som kan ta alle dager hvis ingen andre kan.
// e2 = e2.filter((a : any) => a.count === 0 && String(a.rules.match(regex)).includes(String(1)) || a.count === 0 && String(a.rules.match(regex)).includes('*')).sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))
e2 = e2.sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))
.sort((a : any, b : any) => a.count - b.count)
.filter((a : any) => String(a.rules.match(regex)).includes(String(1)) && a.count < currentOptions.maxOccurrences || String(a.rules.match(regex)).includes('*') && a.count < currentOptions.maxOccurrences) 
// console.log(e2)