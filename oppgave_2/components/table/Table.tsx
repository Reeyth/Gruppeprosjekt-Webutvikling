import { TableType } from '../../types'
import TableBody from './TableBody'
import TableHead from './TableHead'

type TableProps = {
  type: TableType
  students: Student[]
}

const Table: React.FC<TableProps> = ({ type, students }) => {
  const tableHeader = {
    age: 'alder',
    gender: 'kjønn',
    group: 'studieretning',
  }

  return (
    <div className="table-element">
      {type !== TableType.DEFAULT && (
        <h2>{`Gruppering etter ${tableHeader[type]}: ${students[0][type]}`}</h2>
      )}
      <table>
        <TableHead labels={['ID', 'Navn', 'Kjønn', 'Alder', 'Gruppe']} />
        <TableBody students={students} />
      </table>
      {type !== TableType.DEFAULT && <span>Antall: {students.length}</span>}
    </div>
  )
}

export default Table
