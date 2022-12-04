import React, { useEffect, useState } from 'react'

const ChangeName = (props : any) => {

    const [name, setName] = useState<string>("")
    const [id, setId] = useState<Number>(1)

    const handleId = (event: any) => {
        setId(event.target.value)
    }

    const handleName = (event: any) => {
        setName(event.target.value)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        try {
            const response = await fetch(`/api/employee/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
            })
        } catch(error) {
            console.error(error)
        }}
    
    return (
    <>
        <h2>Ansatt</h2>
        <div className='flexbox'>
        <form onSubmit={handleSubmit}>
        <label htmlFor='user'>Velg en ansatt å redigere</label>
        <select id='user' onChange={handleId}>
            {props.employees.map((employee: any) => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
        </select>
        <label htmlFor='name'>Nytt navn</label>
        <input id="name" type="text" value={name} onChange={handleName}/>
        <button className="styled-button">Oppdater</button>
        </form>
        </div>
    </>
        
    )
}
export default ChangeName