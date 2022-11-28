import { useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="flexbox">
      <form method="GET" action={`/employee/${search}`}>
        <label htmlFor="person">Navn på ansatt</label>
        <input id="person" value={search} onChange={handleSearch} type="text" />
        <button>Søk</button>
      </form>
    </div>
  )
}

export default Search
