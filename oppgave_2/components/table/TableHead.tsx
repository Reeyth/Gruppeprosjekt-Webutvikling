import React from 'react'

type TableHeadProps = {
    labels: string[]
}

const TableHead: React.FC<TableHeadProps> = ({labels}) => {
  return (
    <thead>
      <tr>
        {labels.map((label: string) => <th>{label}</th>)}
      </tr>
    </thead>
  )
}

export default TableHead
