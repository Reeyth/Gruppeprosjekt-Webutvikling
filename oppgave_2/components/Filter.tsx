const Filter = (props : any) => {


    return (
        <div id="filter">
            {/* Four radiobuttons for the different ways of sorting/grouping the students.

            The first radiobutton has the checked attribute to be selected by default when the page loads. It checks if the currentSort is none or name
            and is selected based on that. Using only "checked" would not work becuased of how components is refreshed.  */}
            {/*Added correct props and syntax with typescript types. also removed the current sort (ADD LATER)*/}
            Ingen <input type="radio" value="none" name ="filter" onChange={props.handleSort}/>
            Alder <input type="radio" value="age" name ="filter" onChange={props.handleSort} />
            Kjønn <input type="radio" value="gender" name ="filter" onChange={props.handleSort} />
            Gruppe <input type="radio" value="group" name ="filter" onChange={props.handleSort} />
        </div>
        )
}

export default Filter;