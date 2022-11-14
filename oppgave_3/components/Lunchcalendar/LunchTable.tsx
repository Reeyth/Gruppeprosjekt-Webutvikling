type LunchTableProps = {
    week: Day[]
    personOverwiew: personOverwiew[]
};

const LunchTable: React.FC<LunchTableProps> = ({ week, personOverwiew }) => {

    return (
        <div className="lunch-table">
            {week[0] != null ? (
                <>
                <h2>Uke {week[0].week_number}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Dag</th>
                            <th>Navn</th>
                            <th>Lunsj</th>
                        </tr>
                    </thead>
                    <tbody>
                        {week.map((day: Day) => {
                            console.log(day)
                            return (
                                <tr key={day.id}>
                                    <td>{day.day}</td>
                                    <td>{day.employee_name}</td>
                                    <td>{day.lunch_type}</td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </>
            )
            : (
                <h2>Velg en uke</h2>
            )}
            {/* {personOverwiew[0] != null ? (
                    <>
                    <table>
                    <thead>
                        <tr>
                        <th>Uke</th>
                        <th>Dag</th>
                        <th>Navn</th>
                        <th>Lunsj</th>
                        </tr>
                    </thead>
                    <tbody>
                {personOverwiew.map((person: personOverwiew) => {
                    return (
                        // denne math randomen kan endres til noe mer fornuftig, når buggen er fikset
                        <tr key={Math.random() * 10000}>
                        <td>{person.week_number}</td>
                        <td>{person.day}</td>
                        <td>{person.employee_name}</td>
                        <td>{person.lunch_type}</td>
                        </tr>
                    )})}
                    </tbody>
                </table>
            </>) : null} */}
        </div>
    )
}

export default LunchTable;