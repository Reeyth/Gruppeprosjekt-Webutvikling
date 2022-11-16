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

  const [search, setSearch] = useState('');
  const [personOverwiew, setPersonOverwiew] = useState<personOverwiew[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
  }
  const personDetails = async() => {
    const response = await fetch(`/api/search/${search}`)
    const data = await response.json()
    setPersonOverwiew(data)
}

  return (
    <main>
      <WeekSpan/>
      <Search search={search} setPerson={personDetails} handleSearch={handleSearch}/>
      <LunchCalendar week={week} personOverwiew={personOverwiew} title="Lunsjkalender" weekFetcher={fetchWeek}/>
    </main>
  )
}

export default Home
