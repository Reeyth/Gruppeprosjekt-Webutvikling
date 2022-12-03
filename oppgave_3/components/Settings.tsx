import React, { useState, useEffect } from 'react'

type SettingsProps = {
};

const Settings: React.FC<SettingsProps> = ( ) => {

    const [vacations, setVacations] = useState<number[]>([])
    const [yearSize, setYearSize] = useState<number>(52)
    const [workDays, setWorkDays] = useState<number>(5)

    const fetchSettings = async () => {
        const response = await fetch('/api/settings/settings')
        const data = await response.json()

        setVacations(data.data.vacations)
        setYearSize(data.data.yearSize)
        setWorkDays(data.data.workDays)
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    const handleVacationChange = async (selectedWeek: number) => {
        if (vacations.includes(selectedWeek)) {
            const updatedVacations = vacations.filter(week => week !== selectedWeek)
            setVacations(updatedVacations)
        }
        else {
            const updatedVacations = [...vacations, selectedWeek]
            setVacations(updatedVacations)
        }
    }

    const handleYearSizeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedYearSize = parseInt(event.target.value)
        setYearSize(selectedYearSize)
    }

    const handleWorkDaysChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedWorkDays = parseInt(event.target.value)

        if (selectedWorkDays > 7 || selectedWorkDays < 1) {
            alert('Du må velge mellom 1 og 7 arbeidsdager')
            event.target.value = workDays.toString()
        }
        
        setWorkDays(selectedWorkDays)
    }

    const handleBatchSizeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedBatchSize = parseInt(event.target.value)

        if (selectedBatchSize > 52 || selectedBatchSize < 1) {
            alert('Du må velge mellom 1 og 52 uker')
            event.target.value = workDays.toString()
        }
    }
    

    const handleSave = async () => {
        const response = await fetch(`/api/settings/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vacations: vacations,
                yearSize: yearSize,
                workDays: workDays
            })
        })
        const data = await response.json()
        console.log(data)
    }
            

    const weeks = Array.from(Array(52).keys()).map((i) => i + 1)

    return (
        
        <div className="settings">
            <h2>Instillinger</h2>

            <br></br>

            <div className="vacation-selection">
            <h3>Ferieuker</h3>
            {
                weeks.map((week) => (
                    <button 
                    key={week}
                    onClick={() => {
                        handleVacationChange(week)
                    }}
                    style={
                        vacations.includes(week) ? {backgroundColor: 'red'} : {}
                    }>{week}</button>
                ))
            }
            </div>

            <div className="year-size">
                <h3>Uker i året</h3>
                <p className="year-size-visualize">{yearSize}</p>
                <input type="range" min="1" max="52" defaultValue={yearSize} onChange={handleYearSizeChange}/>
            </div>

            <div className="settings-flex">
                <div className="settings-workdays">
                    <h3>Arbeidsdager</h3>
                    <input type="number" min="1" max="7" defaultValue="5" onChange={handleWorkDaysChange}/>
                </div>
                <div className="settings-batch-size">
                    <h3>Batch-størrelse</h3>
                    <p>Velg størrelsen på en batch</p>
                    <input type="number" min="1" max="52" defaultValue="5"/>
                </div>
            </div>

            <div className="settings-save">
                <button 
                onClick={handleSave}
                >Lagre</button>
            </div>
        </div>
    )
}

export default Settings;