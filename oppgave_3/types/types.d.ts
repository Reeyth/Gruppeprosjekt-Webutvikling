interface Day {
    id: number
    week_number: number
    day: string
    employee_name: string
    lunch_type: string
    overwrite_employee_id: number
    overwrite_employee: string
}

interface Week {
    employee_id: number
    days: Day[]
}