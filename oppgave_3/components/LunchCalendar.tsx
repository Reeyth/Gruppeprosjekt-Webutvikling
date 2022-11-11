import React, { useEffect, useState } from 'react'
import LunchTable from './Lunchcalendar/LunchTable'
import WeekSelection from './Lunchcalendar/WeekSelection'

type LunchCalendarProps = {
    title: string
}

const LunchCalendar: React.FC<LunchCalendarProps> = ({ title }) => {
    const weeks = Array.from(Array(52).keys()).map((i) => i + 1)
    const [week, setWeek] = useState<Day[]>([])
    useEffect(() => {
    }, [])

    const fetchWeek = async (week: any) => {
        try {
            const response = await fetch(`/api/weeks/${week}`)
            const data = await response.json()
            data.week_number = { week }
            setWeek(data)
        } catch(error) {
            console.error(error)
        }
    }
    
    return (
        <>
        <h1>{title}</h1>
        <WeekSelection title="Uker" weeks={weeks} fetchWeek={fetchWeek} />
        <LunchTable week={week} />
        </>
    )
}
export default LunchCalendar