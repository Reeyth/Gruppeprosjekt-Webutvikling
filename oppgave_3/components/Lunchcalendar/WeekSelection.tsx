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
                <button onClick={() => fetchWeek(week)} key={week}>{week}</button>
            ))}
        </div>
    );
    };

export default WeekSelection;