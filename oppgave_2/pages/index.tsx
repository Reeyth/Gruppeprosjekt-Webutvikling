import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Table from '../components/Table'
import Filter from '../components/Filter'

const Home: NextPage = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/students')
        const data = await response.json()
        setStudents(Array.from(data))
      } catch (error) {
        console.log(error)
      }
    }
    handler()
  }, [])

  const [sortType, setSortType] = useState('none');

  const handleSort = (type: string) => {
      setSortType(type);
  }

  return (
    <main>
      <h1>Student gruppering</h1>

      <Filter handleSort={handleSort} currentSort={sortType} />

      <Table students={students} currentSort={sortType} />

    </main>
  )
}

export default Home
