import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import Nav from '../../components/Nav';
import UpdateWeek from '../../components/UpdateWeek';

const Id = ()  =>  {
    
    const router = useRouter()
    const { id } = router.query
    
    const [week, setWeek] = useState<Day[]>([])
    const fetchWeek = async (weekNumber: any) => {
        try {
            const response = await fetch(`/api/week/${weekNumber}`)
            const data = await response.json()
            setWeek(data)
            console.log(data)
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
        <h1>Update week {id}</h1>
        <UpdateWeek week={week}/>
        </>
    ) 
}
export default Id