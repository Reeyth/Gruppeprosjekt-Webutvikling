// TODO: Her er det bugs

import { useState } from 'react'
import { Strike } from '../components/Strikes'

const initialStrikes = [
  { icon: '⚪', guess: '' },
  { icon: '⚪', guess: '' },
  { icon: '⚪', guess: '' },
]

type Country = {
  name: string
  unicodeFlag: string
} | null

export const useGame = () => {
  const [guesses, setGuesses] = useState<string[]>([])
  const [strikes, setStrikes] = useState<Strike[]>(initialStrikes)
  const [country, setCountry] = useState<Country>(null)

  const isSolved = (country: Country, guesses: string[]) => {
    if (!country) return false
    return [...country.name.replaceAll(' ', '').toLowerCase()].every(
      (letter) => {
        return guesses.includes(letter)
      }
    )
  }

  const isGameOver = strikes.every((strike: any) => strike.guess) ? true : false

  const getMessage = () => {
    if (isSolved(country, guesses) && !isGameOver) return 'Du klarte det'
    else if (isGameOver) return 'Du tapte. Prøv igjen'
    else return 'Velg en bokstav'
  }

  const isMatch = (letter: string) => {
    if (guesses.find((guess: any) => guess === letter.toLowerCase())) {
      return letter
    }
    return '_'
  }

  const wordSplit = () => {
    return (
      country?.name?.split(' ').map((word: string) => word.split('')) || null
    )
  }

  const handleGuess = (letter: string) => {
    {/* CHANGE: Added a check to see if the player has already won or lost the game, to make sure they can't make any new guesses after the game is complete. */}
    if(isGameOver || isSolved(country, guesses)) return;

    if (!country?.name?.toLowerCase().includes(letter.toLowerCase())) {

      {/* CHANGE: The bug caused no strike to actually be set/replaced. 
      We fixed this by getting the first "available" strike which has not been set yet, by using .find and getting the first one without a guess set.
      We then change add a guess/letter to the strike and an icon to display the guess' failiure. Finally, we set the new list of strikes. */}
      const newStrikes = [...strikes]
      const strike = newStrikes.find((strike: any) => !strike.guess)
      if (strike) {
        strike.guess = letter
        strike.icon = '🚫'
        setStrikes(newStrikes)
      }
    }
    setGuesses((prev: string[]) => [...prev, letter.toLowerCase()])
  }

  return {
    guesses,
    setGuesses,
    strikes,
    setStrikes,
    country,
    setCountry,
    isMatch,
    isGameOver,
    handleGuess,
    getMessage,
    wordSplit,
  }
}
