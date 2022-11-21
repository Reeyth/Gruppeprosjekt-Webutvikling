import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import Nav from '../components/Nav';
import Search from '../components/Search/Search'


const Home: NextPage = () => {

  const [week, setWeek] = useState<Day[]>([])

  return (
    <main>
      <Nav/>
      <Search/>
    </main>
  )
}

export default Home