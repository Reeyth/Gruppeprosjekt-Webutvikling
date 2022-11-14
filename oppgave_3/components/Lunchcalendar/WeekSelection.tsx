import Link from 'next/link';

type WeekSelectionProps = {
    title: string;
    weeks: number[];
    fetchWeek: (week: number) => void;
};

const WeekSelection: React.FC<WeekSelectionProps> = ({ title, weeks, fetchWeek }) => {
    
    return (
        <div className="week-selection">
            <h2>{title}</h2>
            {weeks.map((week) => (
                <Link key={week} href={`/week/${week}`}><button onClick={() => fetchWeek(week)}>{week}</button></Link>
            ))}
        </div>
    );
    };

export default WeekSelection;