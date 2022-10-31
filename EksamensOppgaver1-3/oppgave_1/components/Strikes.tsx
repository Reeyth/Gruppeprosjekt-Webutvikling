// TODO: Her er det bugs

export type Strike = { icon: string; guess: string }

export default function Strikes({ strikes }: { strikes: Strike[] }) {
  return (
    <ul className="strikes">
      {strikes.forEach((strike: Strike, index: number) => (
        <li>{strike.icon}</li>
      ))}
    </ul>
  )
}
