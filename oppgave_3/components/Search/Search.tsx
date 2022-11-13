const Search = (props : any) => {

    return(
        <div className="flexbox">

        <label htmlFor="person">Search for person</label>
        <input id="person" value={props.search} onChange={props.handleSearch} type="text" />
        <button onClick={props.setPerson}>Search</button>

        </div>
    )
}

export default Search