import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import Nav from '../../components/Nav';
import UpdateWeek from '../../components/UpdateWeek';

const Id = ()  =>  {

    const router = useRouter()
    const { id } = router.query
    
    const [week, setWeek] = useState<Day[]>([])
    const [employees, setEmployees] = useState<any[]>([])
    const fetchWeek = async (weekNumber: any) => {
        try {
            const response = await fetch(`/api/week/${weekNumber}`)
            const data = await response.json()
            const getAllEmployees = await fetch(`/api/allEmployees`)
            const allEmployees = await getAllEmployees.json()
            setEmployees(allEmployees)
            setWeek(data)
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchWeek(id)
    }, [id])
    
    return (
        <>
        <Nav/>
        <h2>Oppdatering av uke {id}</h2>
        <UpdateWeek week={week} employees={employees}/>
        </>
    ) 
}
export default Id