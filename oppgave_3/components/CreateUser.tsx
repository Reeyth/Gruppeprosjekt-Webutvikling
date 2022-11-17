import { useState } from "react"

type Employee = {
    name: String,
    rules: String
}

const WeekSpan = () => {
    
    const [name, setName] = useState<String>('')
    const [rules, setRules] = useState<String[]>([])

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleRules = (e: any) => {
        setRules((prev) => [...prev, e.target.value])
        console.log(rules)
    }
    const getDay = (index : number) => {
        console.log(index)
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        return days[index]
    }
    const removeThis = (index : any) => {
        if(rules.length === 0){
            setRules([])
        } else {
            const newRules = rules.filter((rule, i) => i !== index)
            setRules(newRules)
        }
    }

    return (
        <>
        <div className="flexbox">
        <form method="POST" action="api/create/employee">
            <label htmlFor="name">Navn</label>
            <input type="text" name="name" id="name" value={String(name)} onChange={handleName}/>
            <label htmlFor="rules">Tilgjenglighet</label>
            <select onChange={handleRules} id="rules" name="rules">
                <option value="*">Alle dager</option>
                <option value="1">Mandager</option>
                <option value="2">Tirsdager</option>
                <option value="3">Onsdager</option>
                <option value="4">Torsdager</option>
                <option value="5">Fredager</option>
            </select>
        </form>
        {rules.length === 0 ? <p>Vennligst velg når du er tilgjenglig.</p> :
            rules.map((rule, index) => (
                <>
                <p key={Number(rule)-1}>{rule} - {getDay(Number(rule)-1)}</p><button onClick={() => removeThis(Number(index))}>Fjern</button>
                </>
            ))}
        </div>


        </>
    )
}

export default WeekSpan