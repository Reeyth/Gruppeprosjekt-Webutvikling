import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import Link from 'next/link';
import Nav from '../../components/Nav';


const HomeUpdate: NextPage = () => {
  const weeks = Array.from(Array(52).keys()).map((i) => i + 1)

  return (
    <main>
      <Nav/>
      <h2>Which week would you like to update?</h2>
      <div className="week-selection">
      {weeks.map((week) => (
          <Link key={week} href={`/update/${week}`}><button>{week}</button></Link>
      ))}
      </div>
    </main>
  )
}

export default HomeUpdate