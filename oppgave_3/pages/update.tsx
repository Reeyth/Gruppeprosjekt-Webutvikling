import type { NextPage } from 'next'
import Link from 'next/link';
import Nav from '../components/Nav';


const HomeUpdate: NextPage = () => {
  const weeks = Array.from(Array(52).keys()).map((i) => i + 1)

  return (
    <main>
      <Nav/>
      <h2>Hvilken uke ønsker du å oppdatere?</h2>
      <div className="week-selection">
      {weeks.map((week) => (
          <Link key={week} href={`/update/${week}`}><button>{week}</button></Link>
      ))}
      </div>
    </main>
  )
}

export default HomeUpdate