import Link from "next/link";
import { useState, useEffect } from "react";

const PersonnelList = () => {
    const [employees, setEmployees] = useState<any[]>([])
    const fetchEmployees = async () => {
        try {
            const response = await fetch(`/api/allEmployees`)
            const data = await response.json()
            setEmployees(data)
            console.log(data)
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchEmployees()
    }, [])

    return (
        <>
            <h2>Peronsalliste</h2>
            <div className="employee-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Navn</th>
                            <th>Regler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee: any) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td><Link href={`/employee/${employee.name}`}>{employee.name}</Link></td>
                                <td>{employee.rules}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PersonnelList
