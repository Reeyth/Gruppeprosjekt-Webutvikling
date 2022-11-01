import React from 'react'
import { TableType } from '../types'

type FilterProps = {
  handleSort: (value: TableType) => void
  type: TableType
}

const Filter: React.FC<FilterProps> = ({ handleSort, type }) => {
  return (
    <div id="filter">
      <input
        type="radio"
        value={TableType.DEFAULT}
        name="filter"
        onChange={() => handleSort(TableType.DEFAULT)}
        checked={type === TableType.DEFAULT}
      />
      <label htmlFor="none">Ingen</label>
      <input
        type="radio"
        value={TableType.AGE}
        name="filter"
        onChange={() => handleSort(TableType.AGE)}
      />
      <label htmlFor="age">Alder</label>
      <input
        type="radio"
        value={TableType.GENDER}
        name="filter"
        onChange={() => handleSort(TableType.GENDER)}
      />
      <label htmlFor="gender">Kjønn</label>
      <input
        type="radio"
        value={TableType.GROUP}
        name="filter"
        onChange={() => handleSort(TableType.GROUP)}
      />
      <label htmlFor="group">Gruppe</label>
    </div>
  )
}

export default Filter
