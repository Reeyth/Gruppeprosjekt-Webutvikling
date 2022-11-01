const Filter = ( { handleSort, currentSort }) => {

    const _handleSort = (e) => {
        handleSort(e.target.value);
    }

    return (
        <div id="filter">
            {/* Four radiobuttons for the different ways of sorting/grouping the students.

            The first radiobutton has the checked attribute to be selected by default when the page loads. It checks if the currentSort is none or name
            and is selected based on that. Using only "checked" would not work becuased of how components is refreshed.  */}
            Ingen <input type="radio" value="none" name ="filter" onChange={_handleSort} checked={currentSort === 'none'}/>
            Alder <input type="radio" value="age" name ="filter" onChange={_handleSort} />
            Kjønn <input type="radio" value="gender" name ="filter" onChange={_handleSort} />
            Gruppe <input type="radio" value="group" name ="filter" onChange={_handleSort} />
        </div>
        )
}

export default Filter;