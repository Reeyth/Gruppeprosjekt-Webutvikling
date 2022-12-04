import React, { useState, useEffect } from 'react'

type SettingsProps = {}

const Settings: React.FC<SettingsProps> = () => {
  const [vacations, setVacations] = useState<number[]>([])
  const [yearSize, setYearSize] = useState<number>(52)
  const [workDays, setWorkDays] = useState<number>(5)
  const [batchSize, setBatchSize] = useState<number>(5)
  const [maxOccurrences, setMaxOccurrences] = useState<number>(2)

  const fetchSettings = async () => {
    const response = await fetch('/api/settings/settings')
    const data = await response.json()

    setVacations(data.data.vacations)
    setYearSize(data.data.yearSize)
    setWorkDays(data.data.workDays)
    setBatchSize(data.data.batchSize)
    setMaxOccurrences(data.data.maxOccurences)
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleVacationChange = async (selectedWeek: number) => {
    if (vacations.includes(selectedWeek)) {
      const updatedVacations = vacations.filter((week) => week !== selectedWeek)
      setVacations(updatedVacations)
    } else {
      const updatedVacations = [...vacations, selectedWeek]
      setVacations(updatedVacations)
    }
  }

  const handleSettingsChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target

    switch (id) {
      case 'year-size':
        if (Number(value) > 0 && Number(value) < 53) {
            setYearSize(Number(value))
        } else {
          alert('Uker i året må være mellom 1 og 52')
          e.target.value = String(yearSize)
        }
        break
      case 'workdays':
        if (Number(value) > 0 && Number(value) < 8) {
          setWorkDays(Number(value))
        } else {
          alert('Arbeidsdager i uken må være mellom 1 og 7')
          e.target.value = String(workDays)
        }
        break
      case 'batch-size':
        if (Number(value) > 1 && Number(value) < 13) {
          setBatchSize(Number(value))
        } else {
          alert('Antall uker i batch må være mellom 2 og 12')
          e.target.value = String(batchSize)
        }
        break
      case 'max-occurences':
        if (Number(value) > 0 && Number(value) < 11) {
          setMaxOccurrences(Number(value))
        } else {
            alert('Antall forekomster må være mellom 1 og 10')
            e.target.value = String(maxOccurrences)
        }
        break
    }
  }

  const handleSave = async () => {
    const response = await fetch(`/api/settings/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vacations: vacations,
        yearSize: yearSize,
        workDays: workDays,
        batchSize: batchSize,
        maxOccurrences: maxOccurrences,
      }),
    })
    const data = await response.json()
  }

  const weeks = Array.from(Array(52).keys()).map((i) => i + 1)

  return (
    <div className="settings">
      <h2>Instillinger</h2>

      <br></br>

      <div className="vacation-selection">
        <h3>Ferieuker</h3>
        {weeks.map((week) => (
          <button
            key={week}
            onClick={() => {
              handleVacationChange(week)
            }}
            style={vacations.includes(week) ? { backgroundColor: 'red' } : {}}
          >
            {week}
          </button>
        ))}
      </div>

      <div className="settings-year-size">
        <h3>Uker i året</h3>
        <p className="year-size-visualize">{yearSize}</p>
        <input
          id="year-size"
          type="range"
          min="1"
          max="52"
          defaultValue={yearSize}
          onChange={handleSettingsChange}
        />
      </div>

      <div className="settings-flex">
        <div className="settings-workdays">
          <h3>Arbeidsdager i uken</h3>
          <p>Hvor mange arbeidsdager skal det være i en uke? (1-7):</p>
          <input
            id="workdays"
            type="number"
            min="1"
            max="7"
            defaultValue="5"
            onChange={handleSettingsChange}
          />
        </div>

        <div className="settings-batch-size">
          <h3>Batch-størrelse</h3>
          <p>Velg størrelsen på en batch, i antall uker (2-12):</p>
          <input
            id="batch-size"
            type="number"
            min="2"
            max="12"
            defaultValue="4"
            onChange={handleSettingsChange}
          />
        </div>

        <div className="settings-max-occurences">
          <h3>Maks forekomster</h3>
          <p>
            Velg hvor mange ganger èn ansatt kan forekomme i løpet av en gruppe
            (1-10):
          </p>
          <input
            id="max-occurences"
            type="number"
            min="1"
            max="10"
            defaultValue="2"
            onChange={handleSettingsChange}
          />
        </div>
      </div>

      <div className="settings-save">
        <button className="styled-button" onClick={handleSave}>Lagre</button>
      </div>
    </div>
  )
}

export default Settings
