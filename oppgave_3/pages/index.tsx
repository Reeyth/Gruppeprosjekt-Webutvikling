import type { NextPage } from 'next'
import { useState } from "react";
import LunchCalendar from '../components/LunchCalendar'
import Nav from '../components/Nav';

const HomePage: NextPage = () => {

  const [week, setWeek] = useState<Day[]>([])

  return (
    <main>
      <Nav/>
      <LunchCalendar week={week} response={"Velg tabell"}/>
    </main>
  )
}

export default HomePage
