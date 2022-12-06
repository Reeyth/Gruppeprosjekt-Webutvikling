import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import LunchTable from '../../components/Lunchcalendar/LunchTable';
import Nav from '../../components/Nav';
import WeekSpan from '../../components/Span';

const Span = () => {
    const router = useRouter()
    const index = router.query.id
    
    const [week, setWeek] = useState<Day[]>([])
    const [response, setResponse] = useState<string>('')

    const fetchWeek = async (week: any) => {
        if(week === undefined) return
        try {
            const response = await fetch(`/api/span/${week[0]}/${week[1]}`)
            const data = await response.json()
            data.week_number = { week }
            setWeek(data)
            setResponse('')
        } catch(error) {
            console.error(error)
            setResponse('Noe gikk galt')
        }
    }
    useEffect(() => {
        fetchWeek(index)
    }, [index])
    
    return (
        <div>
        <Nav/>
        <WeekSpan/>
        <LunchTable week={week} response={response}/>
        </div>
    )
}

export default Span