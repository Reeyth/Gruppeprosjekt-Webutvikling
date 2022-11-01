const Table = ( { students } : any) => {

    return (        
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Navn</th>
                        <th>Kjønn</th>
                        <th>Alder</th>
                        <th>Gruppe</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student : any) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.gender}</td>
                            <td>{student.age}</td>
                            <td>{student.group}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;