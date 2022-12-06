// TODO: Her er det bugs

export type Strike = { icon: string; guess: string }

export default function Strikes({ strikes }: { strikes: Strike[] }) {
  return (
    <ul className="strikes">
      {/* CHANGE: We changed from using forEach to using map.
        The list element also needed a unique key prop, so we added index as a key.
      */}
      {strikes.map((strike: Strike, index: number) => (
        <li key={index}>{strike.icon}</li>
      ))}
    </ul>
  )
}
