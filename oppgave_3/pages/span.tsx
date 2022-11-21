import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import Nav from '../components/Nav';
import WeekSpan from '../components/Span';

const Span: NextPage = () => {

  const [week, setWeek] = useState<Day[]>([])

  return (
    <main>
      <Nav/>
      <WeekSpan/>
    </main>
  )
}

export default Span