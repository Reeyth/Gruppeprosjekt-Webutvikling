import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/students')
        const data = await response.json()
        setStudents(Array.from(data))
        console.log(students)
      } catch (error) {
        console.log(error)
      }
    }
    handler()
  }, [])

  return (
    <main>
      <h1>Student gruppering</h1>
    </main>
  )
}

export default Home
