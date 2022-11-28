import type { NextPage } from 'next'
import Link from 'next/link';
import WeekSelection from '../components/Lunchcalendar/WeekSelection';
import Nav from '../components/Nav';


const HomeUpdate: NextPage = () => {
  const weeks = Array.from(Array(52).keys()).map((i) => i + 1)

  return (
    <main>
      <Nav/>
      <h2>Hvilken uke ønsker du å oppdatere?</h2>
      <div className="week-selection">
      <WeekSelection weeks={weeks} hyperlink="/update/"/>
      </div>
    </main>
  )
}

export default HomeUpdate