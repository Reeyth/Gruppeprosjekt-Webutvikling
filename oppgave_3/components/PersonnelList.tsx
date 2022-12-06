import Link from "next/link";
import { useState, useEffect } from "react";
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { Employee } from "../types";

const PersonnelList = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const fetchEmployees = async () => {
        try {
            const response = await fetch(`/api/allEmployees`)
            const data = await response.json()
            setEmployees(data.data)
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchEmployees()
    }, [])

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Lunsjliste');

        workbook.modified = new Date();

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Navn', key: 'name', width: 10 },
            { header: 'Regler', key: 'rules', width: 10 }
        ]
        
        employees.forEach((employee : Employee) => {
            worksheet.addRow({
                id: employee.id,
                name: employee.name,
                rules: employee.rules
            })
        })

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            saveAs(blob, 'Personalliste.xlsx');
        })
    }

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
                            <th>Antall lunsjdager</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map((employee: Employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td><Link href={`/employee/${employee.id}`}>{employee.name}</Link></td>
                                <td>{employee.rules}</td>
                                <td>{employee.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="styled-button" onClick={exportToExcel}>Eksporter til Excel</button>
            </div>
        </>
    )
}

export default PersonnelList
