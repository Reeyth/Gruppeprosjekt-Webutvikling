import { employees } from '../data/employees';
import { useState } from 'react';

const UpdateWeek = (props : any) => {

    const [employeId, setEmployeeId] = useState(0);

    return(
        <>
        <div className="lunch-table">
        <table>
            <thead>
                <tr>
                    <th>Dag</th>
                    <th>Navn</th>
                    <th>Lunsj</th>
                </tr>
            </thead>
            <tbody>
        {props.week.map((day: any) => {
            return (
                <tr key={day.id}>
                    <td>{day?.day}</td>

                    <td>
                        <select onChange={(e) => setEmployeeId(e.target.value)}>
                            <option value="0">{day?.employee_name}</option>
                            {employees.map((employee) => {
                                return (
                                    <option disabled={day?.employee_name === employee.name} key={employee.id} value={employee.id}>{employee.name}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td>{day?.lunch_type}</td>
                </tr>
            )
                    })}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default UpdateWeek;