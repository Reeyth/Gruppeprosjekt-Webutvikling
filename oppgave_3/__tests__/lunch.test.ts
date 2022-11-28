import { employees } from "../data/employees";
import { feedMap, mapOfEmployees, createLunchList }  from "../prisma/algo";

it("should return a list of employees", () => {
  mapOfEmployees.set('all', [])
  for(const employee of employees) {
    feedMap(employee);
  }
  for(const key of mapOfEmployees.keys()) {
    expect(mapOfEmployees.get(key).length).toBeGreaterThan(0);
  }
});

const options = {
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
const data = createLunchList(options, mapOfEmployees);

it('should be 52 weeks', () => {
  expect(data.length).toBe(52);
})

it("Should have 5 unique employees each week", () => {
  for(const week of data) {
    let employeesUsed = [];
    for(const day of week) {
      expect(employeesUsed.includes(day.employeeId)).toBe(false);
      employeesUsed.push(day.employeeId);
    }
  }
})

it("There should be no employees working when vacation", () => {
    for(const holidays of options.vacations) {
      expect(data[holidays-1].length).toEqual(0);
    }
})
describe('Validation', () => {
  console.log('---Validation---');
    it("Should fail when if employee apperas more than once in the same week", () => {
      let employeesUsed = [1]
        for(const day of data[0]) {
          day.employeeId = 1;
          expect(employeesUsed.includes(1)).toBe<boolean>(true);
        }
    })
    it("Should fail when batch of size 4 have more than 1 occurance of the same employee", () => {
      
      for(let i = 0; i < options.yearSize / 4; i++) {
        let employeesUsed = [];
        for(let j = 0; j < options.batchSize; j++) {
          for(const day of data[i * 4 + j]) {
            expect(employeesUsed.includes(day.employeeId && day.name)).toBe<boolean>(false);
            employeesUsed.push(day);
          }
        }
      }
    })
    

  })