import { useState } from 'react'
import { Employee } from '../types'

const UpdateWeek = (props: any) => {
  const [employeId, setEmployeeId] = useState<{ [id: number]: any }>([
    { id: 0 },
    { id: 0 },
    { id: 0 },
    { id: 0 },
    { id: 0 },
  ])

  const handleEmployeeChange = (event: any, index: number) => {
    employeId[index] = Number(event.target.value)
  }
  
  const handleSubmit = async (idEmployee: Number, dayId: Number) => {
    const response = await fetch(`/api/week/${dayId}/${idEmployee}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeId),
    })
    if (response.status === 200) {
      window.location.reload()
    } else {
      alert('Det skjedde en feil i oppdateringen av uken')
    }
  }

  return (
    <>
      <div className="lunch-table">
        <table>
          <thead>
            <tr>
              <th>Dag</th>
              <th>Lunsj</th>
              <th>Navn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
            props.week[0] &&
            props.week.map((day: Day, index: number) => {
              return (
                <tr key={day.id}>
                  <td>{day?.day}</td>
                  <td>{day?.lunch_type}</td>
                  <td className="changeEmployee">
                    {day?.overwrite_employee != null ? (
                        <>
                          {day?.overwrite_employee} <span className="employee-original">&#40;{day?.employee_name}&#41;</span>
                        </>
                      ) : (
                        <>{day?.employee_name}</>
                      )}
                    <select
                      defaultValue={'DEFAULT'}
                      onChange={(e) => handleEmployeeChange(e, index)}
                    >
                      <option value="DEFAULT" disabled hidden>
                        Velg en ny ansatt
                      </option>
                      {props.employees?.map((employee: Employee) => {
                        return (
                          <option
                            disabled={day?.employee_name === employee.name}
                            key={employee.id}
                            value={employee.id}
                          >
                            {employee.name}
                          </option>
                        )
                      })}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleSubmit(employeId[index], day?.id)}
                    >
                      Oppdater
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="paragraph-info">* Den ansatte som originalt var tildelt en dag vises i <span className="employee-original">rødt</span>.</p>
        <a className="styled-button" href="/update">Gå tilbake</a>
      </div>
    </>
  )
}

export default UpdateWeek
