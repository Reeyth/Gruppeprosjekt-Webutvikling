export type Data = { status: true; data: Record<string, unknown> }
export type Error = { status: false; error: string }

export type Result = Data | Error

export type Employee = {
    id: number
    name: string
    rules: string
    count: number
    days: Map<string, number>
  }

export type Week = {
    name: string
    employeeId: number
    weekId: number
    lunchId: number
}

export type Options = {
    vacations: number[]
    yearSize: number
    workDays: number
    batchSize: number
    maxOccurrences: number
    days: string[]
    }