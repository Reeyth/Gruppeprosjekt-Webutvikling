import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import LunchCalendar from '../components/LunchCalendar'
import Nav from '../components/Nav';

const Home: NextPage = () => {

  const [week, setWeek] = useState<Day[]>([])

  return (
    <main>
      <Nav/>
      <LunchCalendar week={week}/>
    </main>
  )
}

export default Home
