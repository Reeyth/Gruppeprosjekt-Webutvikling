import React, { useEffect, useState } from 'react'
import { TableType } from '../types'
import Table from './table/Table'

type MainTableProps = {
  type: TableType
  students: Student[]
}

const MainTable: React.FC<MainTableProps> = ({ type, students }) => {
  const [displayStudents, setDisplayStudents] = useState<Student[][]>([])

  const getStudentValue = (student: Student) => {
    switch (type) {
      case TableType.AGE:
        return '' + student.age
      case TableType.GENDER:
        return student.gender
      case TableType.GROUP:
        return student.group
      default:
        return null
    }
  }

  useEffect(() => {
    const temp = new Map()
    for (const student of students) {
      const value = getStudentValue(student)
      if (!value) continue
      if (!temp.has(value)) temp.set(value, [student])
      else temp.set(value, [...temp.get(value), student])
    }
    const sorted = new Map([...temp].sort())
    setDisplayStudents([...sorted.values()])
  }, [type])

  return (
    <div>
      {type === TableType.DEFAULT ? (
        <Table type={type} students={students} />
      ) : (
        <>
          {displayStudents.map((studs, index) => (
            <Table key={index} type={type} students={studs} />
          ))}
        </>
      )}
    </div>
  )
}

export default MainTable
