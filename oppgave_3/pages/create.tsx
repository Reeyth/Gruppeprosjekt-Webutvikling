import type { NextPage } from 'next'
import { useState } from "react";
import LunchCalendar from '../components/LunchCalendar'
import Nav from '../components/Nav';
import Search from '../components/Search/Search'
import WeekSpan from '../components/Span';

const Create: NextPage = () => {

  return (
    <main>
        <Nav/>
      <WeekSpan/>
      <Search/>
    </main>
  )
}

export default Create
