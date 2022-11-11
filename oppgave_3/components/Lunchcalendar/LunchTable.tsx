import dynamic from "next/dynamic";

type LunchTableProps = {
    week: Day[]
};

const LunchTable: React.FC<LunchTableProps> = ({ week }) => {

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
        </div>
    )
}

export default LunchTable;