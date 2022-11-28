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


let regex = /(?!days:)([\d]+)|\*/g
//randomizer mappet til employees og sorterer etter regler for å prioritere dem.
let e2 = map.get("all").sort(() => Math.random() > 0.5 ? 1 : -1).sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))

//filtrer ut basert på regler for å prioritere dem. og følge algoen. tilegg har med de som kan ta alle dager hvis ingen andre kan.
e2 = e2.filter((a : any) => a.count === 0 && String(a.rules.match(regex)).includes(String(1)) || a.count === 0 && String(a.rules.match(regex)).includes('*'))


let weeks = []
let evenCount = 0;
let evenBump = 0;
let oddCount = 0;
let oddBump = 0;
let allCount = 0;
let allBump = 0;
let allEmployeeList;
let evenEmployeeList;
let oddEmployeeList;
let employee;


for (let i = 1; i <= 52; i++) {


  for (let n = 1; n <= 5; n++) {
    allEmployeeList = map.get("all").sort(() => Math.random() > 0.5 ? 1 : -1).sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))
    evenEmployeeList = map.get("even").sort(() => Math.random() > 0.5 ? 1 : -1).sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))
    oddEmployeeList = map.get("odd").sort(() => Math.random() > 0.5 ? 1 : -1).sort((a : any, b : any) => (a.rules.match(/(?!days:)([\^\d]+)/g) ? Number(b.rules.match(/(?!days:)([\^\d]+)/g)) - Number(a.rules.match(/(?!days:)([\^\d]+)/g)) : 0 ))
    if (i % 2 === 0) {
      if(evenBump <= allBump) {
        employee = evenEmployeeList.filter((a : any) => a.count === evenBump && String(a.rules.match(regex)).includes(String(n)) || a.count === evenBump && String(a.rules.match(regex)).includes('*'))[0]
        evenCount++
        employee.count++
        if(evenCount % evenEmployeeList.length === 0) {
            evenBump++
        }}
        else {
          employee = allEmployeeList.filter((a : any) => a.count === allBump && String(a.rules.match(regex)).includes(String(n)) || a.count === allBump && String(a.rules.match(regex)).includes('*'))[0]
          allCount++
          employee.count++
          if(allCount % allEmployeeList.length === 0) {
              allBump++
          }
        }
    }
    // funker ikke
    // else{
    //   if(oddBump <= allBump) {
    //     employee = oddEmployeeList.filter((a : any) => a.count === oddBump && String(a.rules.match(regex)).includes(String(n)) || a.count === oddBump && String(a.rules.match(regex)).includes('*'))[0]
    //     oddCount++
    //     employee.count++
    //     if(oddCount % oddEmployeeList.length === 0) {
    //         oddBump++
    //     }}
    //     else {
    //       employee = allEmployeeList.filter((a : any) => a.count === allBump && String(a.rules.match(regex)).includes(String(n)) || a.count === allBump && String(a.rules.match(regex)).includes('*'))[0]
    //       allCount++
    //       employee.count++
    //       if(allCount % allEmployeeList.length === 0) {
    //           allBump++
    //       }
    //     }
    // }
    weeks.push({week: i, day: days[n-1], employee: employee})
    employee = ""
  }


}

console.log(map)