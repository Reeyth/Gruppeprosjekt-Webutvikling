import React, { useEffect, useState } from 'react'
import { Employee } from '../types'

const ChangeName = (props : any) => {

    const [name, setName] = useState<string>("")
    const [id, setId] = useState<Number>(1)
    const [success, setSuccess] = useState<boolean>(false)

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
            if(response.status === 200) {
                setSuccess(true)
                document.location.reload()
            }
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
            {props.employees.map((employee: Employee) => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
        </select>
        <label htmlFor='name'>Nytt navn</label>
        <input id="name" type="text" value={name} onChange={handleName}/>
        <button className="styled-button">Oppdater</button>
        {success && <p>Navn oppdatert</p>}
        </form>
        </div>
    </>
        
    )
}
export default ChangeName