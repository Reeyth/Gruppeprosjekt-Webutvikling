import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LunchTable from '../../components/Lunchcalendar/LunchTable'
import Nav from '../../components/Nav'
import Search from '../../components/Search/Search'

const Span = () => {
  const router = useRouter()
  const name = router.query.name

  const [week, setWeek] = useState<Day[]>([])
  const [response, setResponse] = useState<string>('')

  const fetchWeek = async (name: any) => {
    try {
      const response = await fetch(`/api/search/${name}`)
      const data = await response.json()
      setWeek(data.data)
      setResponse(data.message)
      return data
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    fetchWeek(name)
  }, [name])


  return (
    <div>
      <Nav />
      <h2>Søk etter en ansatt</h2>
      <Search />
      <LunchTable week={week} response={response}/>
    </div>
  )
}

export default Span
