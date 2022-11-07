import React, { useEffect, useState } from 'react'

const Weeks = () => {
    const weeks = Array.from(Array(52).keys()).map((i) => i + 1)
    const [week, setWeek] = useState([])
    useEffect(() => {
    }, [])

    const fetchWeek = async (week: any) => {
        try {
            const response = await fetch(`/api/weeks/${week}`)
            const data = await response.json()
            console.log(data)
            setWeek(data)
            console.log(data)
        } catch(error) {
            console.error(error)
        }
    }
    
    return (
        <>
        <h2>Uker</h2>
        <div className="multi-button">
        {weeks.map((week) => (
            <button onClick={() => fetchWeek(week)} key={week}>{week}</button>
        ))}
        </div>
        <div className='daysGray'>
                    <h2>Dag</h2>
                    <h2>Navn</h2>
                    <h2>Lunsj</h2>
                </div>
        {week.map((week: any) => {
            return (
                <div key={week.day} className={week.id % 2 === 0 ? 'daysGray' : 'days'}>
                    <div>{week.day}</div>
                    <div>{week.Employee_Name}</div>
                    <div>{week.lunch}</div>
                </div>
            )
        })}
        </>
    )
}
export default Weeks