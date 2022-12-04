import { employees } from '../data/employees'
import {
  feedMap,
  createLunchList,
  validateBatch,
} from '../hooks/algo'

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

it('should return a list of employees', () => {
  const mapOfEmployees = new Map()
  feedMap(employees, mapOfEmployees, options.workDays, options.days)
 
  for (const key of mapOfEmployees.keys()) {
    expect(mapOfEmployees.get(key).length).toBeGreaterThan(0)
  }
})

const mapOfEmployees = new Map()
feedMap(employees, mapOfEmployees, options.workDays, options.days)

const data = createLunchList(options, mapOfEmployees)

it('should be 52 weeks', () => {
  expect(data.length).toBe(52)
})

it('Should have 5 unique employees each week', () => {
  for (const week of data) {
    let employeesUsed = []
    for (const day of week) {
      expect(employeesUsed.includes(day.employeeId)).toBe(false)
      employeesUsed.push(day.employeeId)
    }
  }
})

it('There should be no employees working when vacation', () => {
  for (const holidays of options.vacations) {
    expect(data[holidays - 1].length).toEqual(0)
  }
})
describe('Validation', () => {
  it('Should fail when batch of size 4 and maxOccournce 1 when not enough employees.', () => {
    const opt = { ...options, batchSize: 7, maxOccurrences: 1 }
    const employeemap = new Map()
    for (let i = 0; i < 6; i++) {
      employeemap
        .get('all')
        .push({ id: i, name: 'test' + i, rules: '*', occourance: 0, count: 0 })
    }
    expect(() => {
      createLunchList(opt, employeemap)
    }).toThrow(TypeError)
  })
  it('Should fail when batch of size 4 have more than 2 occurrences of employee', () => {
    const opt = { ...options, batchSize: 4, maxOccourances: 2 }
    const batch = [
      [
        { employeeId: 1, name: 'Mandag' },
        { employeeId: 2, name: 'Tirsdag' },
        { employeeId: 3, name: 'Onsdag' },
        { employeeId: 14, name: 'Torsdag' },
        { employeeId: 15, name: 'Fredag' },
      ],
      [
        { employeeId: 4, name: 'Mandag' },
        { employeeId: 5, name: 'Tirsdag' },
        { employeeId: 7, name: 'Onsdag' },
        { employeeId: 41, name: 'Torsdag' },
        { employeeId: 23, name: 'Fredag' },
      ],
      [
        { employeeId: 4, name: 'Mandag' },
        { employeeId: 6, name: 'Tirsdag' },
        { employeeId: 9, name: 'Onsdag' },
        { employeeId: 13, name: 'Torsdag' },
        { employeeId: 22, name: 'Fredag' },
      ],
      [
        { employeeId: 4, name: 'Mandag' },
        { employeeId: 1, name: 'Tirsdag' },
        { employeeId: 8, name: 'Onsdag' },
        { employeeId: 17, name: 'Torsdag' },
        { employeeId: 51, name: 'Fredag' },
      ],
    ]
    expect(validateBatch(opt.maxOccourances, batch)).toBe<boolean>(false)
  })

  it('Should fail when batch of size 4 have more than 3 occurrences of employee', () => {
    const opt = { ...options, batchSize: 4, maxOccourances: 3 }
    const batch = [
      [
        { employeeId: 1, name: 'Mandag' },
        { employeeId: 2, name: 'Tirsdag' },
        { employeeId: 3, name: 'Onsdag' },
        { employeeId: 4, name: 'Torsdag' },
        { employeeId: 5, name: 'Fredag' },
      ],
      [
        { employeeId: 1, name: 'Mandag' },
        { employeeId: 7, name: 'Tirsdag' },
        { employeeId: 8, name: 'Onsdag' },
        { employeeId: 1, name: 'Torsdag' },
        { employeeId: 10, name: 'Fredag' },
      ],
      [
        { employeeId: 1, name: 'Mandag' },
        { employeeId: 12, name: 'Tirsdag' },
        { employeeId: 13, name: 'Onsdag' },
        { employeeId: 14, name: 'Torsdag' },
        { employeeId: 15, name: 'Fredag' },
      ],
      [
        { employeeId: 1, name: 'Mandag' },
        { employeeId: 16, name: 'Tirsdag' },
        { employeeId: 17, name: 'Onsdag' },
        { employeeId: 18, name: 'Torsdag' },
        { employeeId: 19, name: 'Fredag' },
      ],
    ]
    expect(validateBatch(opt.maxOccourances, batch)).toBe<boolean>(false)
  })
  it('Should fail when batchsize is greater than number of employees', () => {
    const opt = { ...options, batchSize: 20, maxOccourances: 3 }
    const employeemap = new Map()
    employeemap.set('all', [])
    employeemap.set('even', [])
    employeemap.set('odd', [])
    for (let i = 0; i < 15; i++) {
      employeemap
        .get('all')
        .push({ id: i, name: 'test' + i, rules: '*', occourance: 0, count: 0 })
    }
    expect(() => {
      createLunchList(opt, employeemap)
    }).toThrow(TypeError)
  })
})
describe('Validation employees', () => {
  it('should pass if all employees match rule *', () => {
    const workers = [
      {
        id: 1,
        name: 'Trude',
        rules: 'days:*',
      },
      {
        id: 2,
        name: 'Lars',
        rules: '*',
      },
      {
        id: 3,
        name: 'Finn',
        rules: '*',
      },
      {
        id: 4,
        name: 'Kaare',
        rules: 'days:*|week:odd',
      },
      {
        id: 5,
        name: 'Olav',
        rules: '*',
      },
      {
        id: 6,
        name: 'Sebastian',
        rules: '*',
      },
    ]
    for (const worker of workers) {
      expect(worker.rules.match(/(?!days:)([\d]+)|\*/g)).toEqual(['*'])
    }
  })
  it('Should pass if filter only shows relevant employees following by day.', () => {
    const workers = [
      {
        id: 1,
        name: 'Trude',
        rules: 'days:123',
      },
      {
        id: 2,
        name: 'Lars',
        rules: 'days:2',
      },
      {
        id: 3,
        name: 'Finn',
        rules: 'days:3',
      },
      {
        id: 4,
        name: 'Kaare',
        rules: 'days:4',
      },
    ]
    const filtered = workers.filter(
      (a: any) =>
        String(a.rules.match(/(?!days:)([\d]+)|\*/g)).includes(String(3)) ||
        String(a.rules.match(/(?!days:)([\d]+)|\*/g)).includes('*')
    )
    expect(filtered.length).toEqual(2)
  })
  it('Should fail if an invalid rule is applied to employee', () => {
    const worker = [{ name: 'Lars', rules: 'week:blablabla' }]
    const workerMap = new Map()
    expect(() => {
      feedMap(worker, workerMap, options.workDays, options.days)
    }).toThrow(TypeError)
  })

  it('Should fail if an employee is present more than once in a week', () => {
    const opt = { ...options, batchSize: 2, maxOccourances: 3 }
    const batch = [
      [
        { employeeId: 1, name: 'Mandag' },
        { employeeId: 2, name: 'Tirsdag' },
        { employeeId: 3, name: 'Onsdag' },
        { employeeId: 1, name: 'Torsdag' },
        { employeeId: 5, name: 'Fredag' },
      ],
      [
        { employeeId: 11, name: 'Mandag' },
        { employeeId: 7, name: 'Tirsdag' },
        { employeeId: 8, name: 'Onsdag' },
        { employeeId: 4, name: 'Torsdag' },
        { employeeId: 10, name: 'Fredag' },
      ]
    ]
    expect(validateBatch(opt.maxOccourances, batch)).toBe<boolean>(false)
  })
})
