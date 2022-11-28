import Link from 'next/link'
import { settings } from '../../data/settings'

type WeekSelectionProps = {
  title?: string
  weeks: number[]
  hyperlink: string
}

const WeekSelection: React.FC<WeekSelectionProps> = ({ title, weeks, hyperlink }) => {
  return (
    <div className="week-selection">
      {
        title? <h2>{title}</h2> : null
      }

      {
      weeks.map((week) => (
        <Link key={week} href={`${hyperlink}${week}`}>
          <button disabled={settings.vacations.includes(week)} style={
            settings.vacations.includes(week) ? { backgroundColor: "#DA706B" } : {}
          }>{week}</button>
        </Link>
      ))}
    </div>
  )
}

export default WeekSelection
