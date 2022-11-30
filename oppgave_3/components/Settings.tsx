import { useState, useEffect } from 'react'
import { restoreSettings } from '../data/settings'

type SettingsProps = {
};

const Settings: React.FC<SettingsProps> = ( ) => {

    const [vacations, setVacations] = useState<number[]>([])

    const fetchVacations = async () => {
        try {
            const response = await fetch(`/api/settings/vacations`)
            const data = await response.json()
            setVacations(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchVacations()
    }, [])

    const handleClick = async (week: number) => {
        if(vacations.includes(week)) {
            const response = await fetch(`/api/settings/vacations/${week}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            console.log(data)
            setVacations(data.data)
        } else {
            console.log(vacations)
            const response = await fetch(`/api/settings/vacations/${week}`, {
                method: 'POST'
            })
            const data = await response.json()
            setVacations(data.data)
        }
    }

    const handleRestore = async () => {
        const response = await fetch(`/api/settings/restore`, {
            method: 'POST'
        })
        const data = await response.json()
        setVacations(data.data)
    }

    const weeks = Array.from(Array(52).keys()).map((i) => i + 1)

    return (
        
        <div className="settings">
            <h2>Instillinger</h2>

            <br></br>

            <h3>Ferieuker</h3>
            <div className="vacation-selection">
            {
                weeks.map((week) => (
                    <button 
                    key={week}
                    onClick={() => {
                        handleClick(week)
                    }}
                    style={
                        {
                            backgroundColor: vacations.includes(week) ? "red" : ""
                        }
                    }>{week}</button>
                ))
            }
            </div>
        </div>
    )
}

export default Settings;