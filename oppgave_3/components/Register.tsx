import { useState } from 'react'

const Register = () => {
  const [name, setName] = useState<String>('')
  const [rules, setRules] = useState<String[]>(['*'])
  const [ruleWeek, setRuleWeek] = useState<String>('')
  const [status, setStatus] = useState<String>('')

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleRules = (e: any) => {
    if (rules[0] === '*') {
      removeThis(0)
    } else if (e.target.value === '*') {
      setRules([e.target.value])
      return
    }
    setRules((prev) => [...prev, e.target.value])
  }
  const getDay = (index: any) => {
    if (index === '*') return 'Alle dager'
    const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag']
    return days[index - 1]
  }
  const removeThis = (index: any) => {
    if (rules.length === 0) {
      setRules([])
    } else {
      const newRules = rules.filter((rule, i) => i !== index)
      setRules(newRules)
    }
  }

  const handleRuleweek = (e: any) => {
    const value = e.target.value
    setRuleWeek(value)
  }

  const handleSubmit = async () => {
    // if(await userExists(name)) {
    //   setStatus('En ansatt med dette navnet eksisterer allerede')
    //   return
    // }

    let allRules: String = 'days:' + rules.join('')
    if (ruleWeek != '') {
      allRules = allRules + '|week:' + ruleWeek
    }

    const response = await fetch('/api/create/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, rules: allRules }),
    })
    const data = await response.json()
    if (data.employee) {
      setStatus('Brukeren ble opprettet')
    } else {
      setStatus('Noe gikk galt')
    }
  }

  // const userExists = async ( username: String ) => {
  //   const response = await fetch('http://localhost:3000/api/employee/' + username)
  //   const data = await response.json()
  //   if(data.employee) {
  //     return true
  //   } else {
  //     return false
  //   }

  // }

  return (
    <>
      <div className="flexbox">
        <h2>Registrer en ny ansatt</h2>
        <div className="divwrapper">
          <label htmlFor="name">Navn på ansatt</label>
          <input
            type="text"
            name="name"
            id="name"
            value={String(name)}
            onChange={handleName}
          />
          <h2>Tilgjenglighet</h2>
          <div className="divider">
            <div className="divtop">
              <label htmlFor="rules">Dager</label>
              <select onChange={handleRules} id="rules" name="rules">
                <option value="*">Alle dager</option>
                <option disabled={rules.includes('1')} value="1">
                  Mandager
                </option>
                <option disabled={rules.includes('2')} value="2">
                  Tirsdager
                </option>
                <option disabled={rules.includes('3')} value="3">
                  Onsdager
                </option>
                <option disabled={rules.includes('4')} value="4">
                  Torsdager
                </option>
                <option disabled={rules.includes('5')} value="5">
                  Fredager
                </option>
              </select>
            </div>
            <div className="divtop">
              <label htmlFor="uker">Uker</label>
              <select onChange={handleRuleweek} id="uker" name="uker">
                <option value="">Alle uker</option>
                <option value="odd">Hver oddetall uke</option>
                <option value="even">Hver partall uke</option>
                <option value="3">Hver tredje uke</option>
                <option value="4">Hver fjerde uke</option>
              </select>
            </div>
          </div>

          <div className="rulesDiv">
            {rules.length === 0 ? (
              <p>Vennligst velg når du er tilgjenglig.</p>
            ) : (
              rules.map((rule, index) => (
                <div key={index}>
                  <p>
                    {rule} - {getDay(rule)}
                  </p>
                  <button onClick={() => removeThis(index)}>Fjern</button>
                </div>
              ))
            )}
          </div>
          <button
            disabled={!(rules.length != 0 && name)}
            onClick={() => handleSubmit()}
          >
            Registrer
          </button>
          {status ? <p>{status}</p> : null}
        </div>
      </div>
    </>
  )
}

export default Register
