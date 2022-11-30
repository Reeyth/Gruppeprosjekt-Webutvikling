import Link from 'next/link';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';

type LunchTableProps = {
    week: Day[]
};

const LunchTable: React.FC<LunchTableProps> = ({ week }) => {

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Lunsjliste');

        workbook.modified = new Date();

        worksheet.columns = [
            { header: 'Uke', key: 'week', width: 10 },
            { header: 'Dag', key: 'day', width: 10 },
            { header: 'Navn', key: 'name', width: 10 },
            { header: 'Lunsj', key: 'lunch', width: 10 },
        ];

        week.forEach((day, index) => {
            worksheet.addRow({
                week: day.week_number,
                day: day.day,
                name: day.employee_name,
                lunch: day.lunch_type,
            });
        });

        // Save Excel file

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'Lunsjliste.xlsx');
        });
    };

    return (
        <div className="lunch-table">
            {week[0] != null ? (
                <>
                <table >
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

                <button className="export-to-excel-button" onClick={exportToExcel}>Eksporter til Excel</button>
            </>
            )
            : (
                <h2>Velg en uke</h2>
            )}
        </div>
    )
}

export default LunchTable;