import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import ChangeName from '../components/ChangeName';
import Nav from '../components/Nav';

const UpdateEmployeePage: NextPage = () => {

    const [employees, setEmployees] = useState<any[]>([])

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

  return (
    <main>
      <Nav/>
      <ChangeName employees={employees}/>
    </main>
  )
}

export default UpdateEmployeePage