import type { NextPage } from 'next'
import WeekSelection from '../components/Lunchcalendar/WeekSelection';
import Nav from '../components/Nav';
import { useState, useEffect } from 'react';


const HomeUpdate: NextPage = () => {


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