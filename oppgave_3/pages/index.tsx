import type { NextPage } from 'next'
import { useState } from "react";
import LunchCalendar from '../components/LunchCalendar'
import Search from '../components/Search/Search'
import WeekSpan from '../components/Span';

const Home: NextPage = () => {

  const [week, setWeek] = useState<Day[]>([])
  const fetchWeek = async (week: any) => {
      try {
          const response = await fetch(`/api/week/${week}`)
          const data = await response.json()
          data.week_number = { week }
          setWeek(data)
      } catch(error) {
          console.error(error)
      }
  }

  return (
    <main>
      <WeekSpan/>
      <Search/>
      <LunchCalendar week={week} title="Lunsjkalender" weekFetcher={fetchWeek}/>
    </main>
  )
}

export default Home
