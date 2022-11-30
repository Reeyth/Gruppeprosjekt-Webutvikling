import { useState } from 'react'

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
    <div className="span-selection">
      <h2>Hent frem kalenderen i en periode mellom to uker</h2>
      <form action={`/span/${weekTarget1}/${weekTarget2}`}>
        <label htmlFor="weekTarget1">Fra uke:</label>
        <input
          value={Number(weekTarget1)}
          onChange={handleWeek}
          min="1"
          max="52"
          type="number"
        ></input>
        
        <br></br>
        
        <label htmlFor="weekTarget2">Til uke:</label>
        <input
          value={Number(weekTarget2)}
          onChange={handleWeek2}
          min="1"
          max="52"
          type="number"
        ></input>

        <br></br>

        <input className="submit-span-selection" type="submit" value="Søk" />
      </form>
    </div>
  )
}

export default WeekSpan
