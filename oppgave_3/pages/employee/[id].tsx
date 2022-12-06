import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LunchTable from '../../components/Lunchcalendar/LunchTable';
import Nav from '../../components/Nav';

const EmployeeId = () => {
    const router = useRouter();
    const {id} = router.query;
    const [weeks, setWeeks] = useState<Day[]>([])
    const [response, setResponse] = useState<string>('')

    const fetchWeek = async (id: any) => {
        const response = await fetch(`/api/employee/data/${id}`)
        const data = await response.json()
        setWeeks(data.data)
        setResponse(data.message)
}
  useEffect(() => {
    fetchWeek(id)
  }, [id])
    
    return (
        <>
        <Nav/>
        <h2>Ansatt: {weeks[0]?.employee_name}</h2>
        <LunchTable week={weeks} response={response} />

        </>
    )
}

export default EmployeeId;