import { useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    if (e.target.value.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }

  return (
    <div className="flexbox">
      <form method="GET" action={`/employee/${search}`}>
        <label htmlFor="person">Navn på ansatt</label>
        <input id="person" value={search} onChange={handleSearch} type="text" />
        <button className="styled-button" disabled={buttonDisabled}>Søk</button>
      </form>
    </div>
  )
}

export default Search
