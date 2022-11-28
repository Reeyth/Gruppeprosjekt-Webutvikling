import React, { useEffect, useState } from 'react'
import LunchTable from './Lunchcalendar/LunchTable'
import WeekSelection from './Lunchcalendar/WeekSelection'

type LunchCalendarProps = {
    title: string
}

const LunchCalendar = (props : any) => {
    const weeks = Array.from(Array(52).keys()).map((i) => i + 1)
    useEffect(() => {
    }, [])
    
    return (
        <>
        <h1>{props.title}</h1>
        <WeekSelection title="Uker" weeks={weeks} />
        <LunchTable week={props.week} />
        </>
    )
}
export default LunchCalendar