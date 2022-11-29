import Link from 'next/link'
import { settings } from '../../data/settings'
import { useState, useEffect } from 'react'

type WeekSelectionProps = {
  title?: string
  weeks: number[]
  hyperlink: string
}

const WeekSelection: React.FC<WeekSelectionProps> = ({ title, weeks, hyperlink }) => {
  
const [vacations, setVacations] = useState<number[]>([])

const fetchVacations = async () => {
  try {
    const response = await fetch(`/api/settings/vacations`)
    const data = await response.json()
    setVacations(data.data)
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  fetchVacations()
}, [])

  return (
    <div className="week-selection">
      {
        title? <h2>{title}</h2> : null
      }

      {
      weeks.map((week) => (
        <Link key={week} href={`${hyperlink}${week}`}>
          <button 
          disabled={vacations.includes(week)}
          style={
            vacations.includes(week) ? { 
              backgroundColor: "red"
            } : {}
          }>{week}</button>
        </Link>
      ))}
    </div>
  )
}

export default WeekSelection
