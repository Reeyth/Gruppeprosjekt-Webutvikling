import React, { useEffect, useState } from 'react'
import LunchTable from './Lunchcalendar/LunchTable'
import WeekSelection from './Lunchcalendar/WeekSelection'

type LunchCalendarProps = {
  week: Day[],
  response: string
}

const LunchCalendar: React.FC<LunchCalendarProps> = ({ week, response }) => {
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
      <WeekSelection title="Uker" weeks={weeks} hyperlink="/week/" />
      <LunchTable week={week} response={response} />
    </>
  )
}
export default LunchCalendar
