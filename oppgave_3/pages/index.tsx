import type { NextPage } from 'next'
import LunchCalendar from '../components/LunchCalendar'

const Home: NextPage = () => {
  const dataFetch = async () => {
    try {
      const response = await fetch('/api/calender')
      const data = await response.json()
      console.log(data)
    } catch(error) {
      console.error(error)
    }
  }
  return (
    <main>
      <LunchCalendar title="Lunsjkalender" />
    </main>
  )
}

export default Home
