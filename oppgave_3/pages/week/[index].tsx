import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import LunchCalendar from '../../components/LunchCalendar';
import Nav from '../../components/Nav';
import Search from '../../components/Search/Search';
import WeekSpan from '../../components/Span';

const Week = () => {
    const router = useRouter()
    const { index } = router.query
    
    const [week, setWeek] = useState<Day[]>([])
    const fetchWeek = async (week: any) => {
        try {
            const response = await fetch(`/api/week/${week}`)
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
        <main>
            <div>
            <Nav/>
            <WeekSpan/>
            <Search/>
            <LunchCalendar week={week} weekFetcher={fetchWeek}/>
            </div>
        </main>
    )
}

export default Week