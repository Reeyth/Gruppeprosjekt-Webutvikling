import { employees } from "../data/employees";
import { feedMap, mapOfEmployees, createLunchList, validateBatch }  from "../prisma/algo";

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
    it("Should fail if employee apperas more than once in the same week", () => {
      let employeesUsed = [1]
        for(const day of data[0]) {
          day.employeeId = 1;
          expect(employeesUsed.includes(1)).toBe<boolean>(true);
        }
    })
    it("Should fail when batch of size 4 and maxOccournce 1 when not enough employees.", () => {
        const opt = { ...options, batchSize: 4, maxOccurrences: 1 }
        const employeemap = new Map();
        employeemap.set('all', []);
        for(let i = 0; i < 3; i++) {
          employeemap.get('all').push({ id: i, name: 'test' + i, occourance: 0, count: 0 });
        }
        expect(() => { createLunchList(opt, employeemap); }).toThrow(TypeError);    
    })
    it("Should fail when batch of size 4 have more than 2 occurrences of employee", () => {
      const opt = { ...options, batchSize: 4, maxOccourances: 2 }
      const batch = [
        [{ employeeId: 1}, { employeeId: 2}, { employeeId: 3}, { employeeId: 4}, { employeeId: 5}],
        [{ employeeId: 6}, { employeeId: 7}, { employeeId: 8}, { employeeId: 1}, { employeeId: 10}],
        [{ employeeId: 11}, { employeeId: 12}, { employeeId: 13}, { employeeId: 14}, { employeeId: 15}],
        [{ employeeId: 1}, { employeeId: 16}, { employeeId: 17}, { employeeId: 18}, { employeeId: 19}]
      ]
      expect(validateBatch(opt.maxOccourances, batch)).toBe<boolean>(false);
    })

    it("Should fail when batch of size 4 have more than 3 occurrences of employee", () => {
      const opt = { ...options, batchSize: 4, maxOccourances: 3 }
      const batch = [
        [{ employeeId: 1}, { employeeId: 2}, { employeeId: 3}, { employeeId: 4}, { employeeId: 5}],
        [{ employeeId: 6}, { employeeId: 7}, { employeeId: 8}, { employeeId: 1}, { employeeId: 10}],
        [{ employeeId: 11}, { employeeId: 1}, { employeeId: 13}, { employeeId: 14}, { employeeId: 15}],
        [{ employeeId: 1}, { employeeId: 16}, { employeeId: 17}, { employeeId: 18}, { employeeId: 19}]
      ]
      expect(validateBatch(opt.maxOccourances, batch)).toBe<boolean>(false);
    })

  })