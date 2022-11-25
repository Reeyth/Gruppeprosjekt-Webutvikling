import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import Nav from '../components/Nav';
import Search from '../components/Search/Search'


const SearchPage: NextPage = () => {

  const [week, setWeek] = useState<Day[]>([])

  return (
    <main>
      <Nav/>
      <h2>Søk etter en ansatt</h2>
      <Search/>
    </main>
  )
}

export default SearchPage
