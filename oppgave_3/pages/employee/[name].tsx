import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import LunchCalendar from '../../components/LunchCalendar';
import WeekSpan from '../../components/Span';

const Span = () => {
    const router = useRouter()
    const name = router.query.name
    const [week, setWeek] = useState<Day[]>([])
    const fetchWeek = async (name: any) => {
        try {
            const response = await fetch(`/api/search/${name}`)
            const data = await response.json()
            setWeek(data)
            console.log(name)
            console.log(data)
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchWeek(name)
    }, [name])
    
    return (
        <div>
        <WeekSpan/>
        <LunchCalendar week={week} weekFetcher={fetchWeek}/>
        </div>
    )
}

export default Span