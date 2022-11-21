import Link from 'next/link'

type WeekSelectionProps = {
  title: string
  weeks: number[]
}

const WeekSelection: React.FC<WeekSelectionProps> = ({ title, weeks }) => {
  return (
    <div className="week-selection">
      <h2>{title}</h2>
      {weeks.map((week) => (
        <Link key={week} href={`/week/${week}`}>
          <button>{week}</button>
        </Link>
      ))}
    </div>
  )
}

export default WeekSelection
