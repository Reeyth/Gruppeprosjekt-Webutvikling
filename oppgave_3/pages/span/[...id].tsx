import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import LunchCalendar from '../../components/LunchCalendar';
import Nav from '../../components/Nav';
import WeekSpan from '../../components/Span';

const Span = () => {
    const router = useRouter()
    const index = router.query.id
    
    const [week, setWeek] = useState<Day[]>([])
    const fetchWeek = async (week: any) => {
        try {
            const response = await fetch(`/api/span/${week[0]}/${week[1]}`)
            const data = await response.json()
            data.week_number = { week }
            setWeek(data)
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchWeek(index)
    }, [index])
    
    return (
        <div>
        <Nav/>
        <WeekSpan/>
        <LunchCalendar week={week} weekFetcher={fetchWeek}/>
        </div>
    )
}

export default Span