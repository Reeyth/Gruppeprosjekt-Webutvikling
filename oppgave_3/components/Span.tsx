import { useState } from "react"

const WeekSpan = () => {
    
    const [weekTarget1, setWeekTarget1] = useState<Number>(1)
    const [weekTarget2, setWeekTarget2] = useState<Number>(1)

    const handleWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeekTarget1(Number(e.target.value))
    }
    const handleWeek2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeekTarget2(Number(e.target.value))
    }

    return (
        <>
        <h2>Hent frem kalenderen i en periode mellom to uker</h2>
        <form action={`/span/${weekTarget1}/${weekTarget2}`}>
        <input value={Number(weekTarget1)} onChange={handleWeek} min="1" max="52" type="number"></input>
        <input value={Number(weekTarget2)} onChange={handleWeek2} min="1" max="52" type="number"></input>
        <input type="submit" value="submit"/>
        </form>
        </>
    )
}

export default WeekSpan