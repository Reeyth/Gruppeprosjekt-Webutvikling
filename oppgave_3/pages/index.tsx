import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import LunchCalendar from '../components/LunchCalendar'
import Nav from '../components/Nav';
import Search from '../components/Search/Search'
import WeekSpan from '../components/Span';

const Home: NextPage = () => {

  const [week, setWeek] = useState<Day[]>([])

  return (
    <main>
      <Nav/>
      <WeekSpan/>
      <Search/>
      <LunchCalendar week={week} title="Lunsjkalender"/>
    </main>
  )
}

export default Home
