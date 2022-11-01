import React from 'react'
import TableRow from './TableRow'

type TableBodyProps = {
  students: Student[]
}

const TableBody: React.FC<TableBodyProps> = ({ students }) => {
  return (
    <tbody>
      {students.map((student: Student) => (
        <TableRow key={student.id} student={student}/>
      ))}
    </tbody>
  )
}

export default TableBody
