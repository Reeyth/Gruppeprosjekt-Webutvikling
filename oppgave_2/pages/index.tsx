import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import { TableType } from '../types'
import MainTable from '../components/MainTable'

const Home: NextPage = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [sortType, setSortType] = useState<TableType>(TableType.DEFAULT)

  const _studentFetcher = async () => {
    try {
      const response = await fetch('/api/students')
      const data: Student[] = await response.json()
      setStudents(
        data.sort((a: Student, b: Student) => a.name.localeCompare(b.name))
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    _studentFetcher()
  }, [])

  const handleSort = (type: TableType) => {
    setSortType(type)
  }

  return (
    <main>
      <h1>Student gruppering</h1>
      <Filter handleSort={handleSort} type={sortType} />
      <MainTable type={sortType} students={students} />
    </main>
  )
}

export default Home
