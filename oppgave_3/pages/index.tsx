import type { NextPage } from 'next'
import { useState } from "react";
import LunchCalendar from '../components/LunchCalendar'
import Search from '../components/Search/Search'

const Home: NextPage = () => {

  const [search, setSearch] = useState('');
  const [personOverwiew, setPersonOverwiew] = useState<personOverwiew[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
  }
  const personDetails = async() => {
    const response = await fetch(`/api/search/${search}`)
    const data = await response.json()
    setPersonOverwiew(data)
    console.log(personOverwiew)
}

  return (
    <main>
      <Search search={search} handleSearch={handleSearch} setPerson={personDetails}/>
      <LunchCalendar week={week} title="Lunsjkalender"/>
    </main>
  )
}

export default Home
