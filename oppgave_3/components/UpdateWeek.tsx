import { useState } from 'react';

const UpdateWeek = (props : any) => {

    const [employeId, setEmployeeId] = useState<{[id : number] : any}>([{id: 0}, {id: 0}, {id: 0}, {id: 0} , {id: 0}]);
    const handleEmployeeChange = (event: any, index : number) => {
        employeId[index] = Number(event.target.value);
    }
    const handleSubmit = async (idEmployee : Number, dayId : Number) => {
            const response = await fetch(`/api/week/${dayId}/${idEmployee}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeId)
        });
        console.log(response.status)
        if (response.status === 200) {
            window.location.reload();
        } else {
            alert("Det skjedde en feil i oppdateringen av uken");
        }
    }

    return(
        <>
        <div className="lunch-table">
        <table>
            <thead>
                <tr>
                    <th>Dag</th>
                    <th>Navn</th>
                    <th>Lunsj</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
        {props.week.map((day: any, index : number) => {
            return (
                <tr key={day.id}>
                    <td>{day?.day}</td>
                    <td>{day?.lunch_type}</td>
                    <td className='changeEmployee'>
                    {day?.employee_name}
                        <select onChange={(e) => handleEmployeeChange(e, index)}>
                            <option value={0} selected disabled hidden>Velg en ny ansatt</option>
                            {props.employees?.map((employee : any) => {
                                return (
                                    <option disabled={day?.employee_name === employee.name} key={employee.id} value={employee.id}>{employee.name}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td><button onClick={() => handleSubmit(employeId[index], day?.id)}>Oppdater</button></td>
                </tr>
            )
                    })}
            </tbody>
        </table>
        <a href="http://localhost:3000/update">Gå tilbake</a>
        </div>
        </>
    )
}

export default UpdateWeek;