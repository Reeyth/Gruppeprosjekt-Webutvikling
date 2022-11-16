import Link from 'next/link';
type LunchTableProps = {
    week: Day[]
};

const LunchTable: React.FC<LunchTableProps> = ({ week }) => {

    return (
        <div className="lunch-table">
            {week[0] != null ? (
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
                        {week.map((day: Day) => {
                            return (
                                <tr key={day.id}>
                                    <td>{day?.week_number}</td>
                                    <td>{day?.day}</td>
                                    <td><Link href={`/employee/${day?.employee_name}`}>{day?.employee_name}</Link></td>
                                    <td>{day?.lunch_type}</td>
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