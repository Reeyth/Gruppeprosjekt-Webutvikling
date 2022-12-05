import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LunchTable from '../../components/Lunchcalendar/LunchTable'
import Nav from '../../components/Nav'
import Search from '../../components/Search/Search'

const Employee = () => {
  const router = useRouter()
  const name = router.query.name

  const [week, setWeek] = useState<Day[]>([])
  const [response, setResponse] = useState<string>('')

  const fetchWeek = async (name: any) => {
    if (name !== undefined) {
      const response = await fetch(`/api/search/${name}`).then((res) =>
        res.json()
      ).then((data) => {
        if (data.success === true) {
          setWeek(data.data)
          setResponse('')
        } else {
          setResponse(data.message)
        }
      })
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

export default Employee