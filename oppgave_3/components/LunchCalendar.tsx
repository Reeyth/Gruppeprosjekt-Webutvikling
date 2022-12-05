import React, { useEffect, useState } from 'react'
import LunchTable from './Lunchcalendar/LunchTable'
import WeekSelection from './Lunchcalendar/WeekSelection'

type LunchCalendarProps = {
  title: string
}

const LunchCalendar = (props: any) => {
  const [yearSize, setYearSize] = useState<number[]>([])

  const fetchYearSize = async () => {
    try {
      const response = await fetch(`/api/settings/yearsize`)
      const data = await response.json()
      setYearSize(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchYearSize()
  }, [])

  const weeks = Array.from(Array(yearSize).keys()).map((i) => i + 1)

  return (
    <>
      <h1>{props.title}</h1>
      <WeekSelection title="Uker" weeks={weeks} hyperlink="/week/" />
      <LunchTable week={props.week} response="Velg en uke" />
    </>
  )
}
export default LunchCalendar
