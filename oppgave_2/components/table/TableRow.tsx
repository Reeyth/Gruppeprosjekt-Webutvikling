import React from 'react'

type TableRowProps = {
  student: Student
}

const TableRow: React.FC<TableRowProps> = ({ student }) => {
  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.gender}</td>
      <td>{student.age}</td>
      <td>{student.group}</td>
    </tr>
  )
}

export default TableRow
