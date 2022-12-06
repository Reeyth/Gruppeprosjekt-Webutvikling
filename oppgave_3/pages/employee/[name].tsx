import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LunchTable from '../../components/Lunchcalendar/LunchTable'
import Nav from '../../components/Nav'
import Search from '../../components/Search/Search'

const Employee = () => {
  const router = useRouter()
  const name = router.query.name

  const [weeks, setWeeks] = useState<Week[]>([])
  const [response, setResponse] = useState<string>('')

  const fetchWeek = async (name: any) => {
    if (name !== undefined) {
      const response = await fetch(`/api/search/${name}`).then((res) =>
        res.json()
      ).then((data) => {
        if (data.success === true) {

          /* It is possible to have two employees with the same name, which would cause the data to be combined when searched by name.
          This will split them into two arrays, one for each employee, split by employee_id.
          They will be displayed in two different tables using the LunchTable component */

          const weeks = data.data.reduce((weeks: any, day: any) => {
            const week = weeks.find((week: any) => week.employee_id === day.employee_id)
            if (week) {
              week.days.push(day)
            } else {
              weeks.push({
                employee_id: day.employee_id,
                employee_name: day.employee_name,
                days: [day],
              })
            }
            return weeks
          }, [])

          setWeeks(weeks)
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
      {
        weeks[0]
         ? <LunchTable key={weeks[0].employee_id} week={weeks[0].days} response={response} />
         : <h2>{response}</h2> 
      }
    </div>
  )
}

export default Employee