// TODO: Her er det bugs

import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import Letters from '../components/Letters'
import Strikes from '../components/Strikes'
import Words from '../components/Words'
import { useGame } from '../hooks/useGame'

const Home: NextPage = () => {
  const isFirstRender = useRef(true)
  const {
    country,
    setCountry,
    isMatch,
    wordSplit,
    handleGuess,
    guesses,
    strikes,
    getMessage,
  } = useGame()

  useEffect(() => {
    if (!isFirstRender.current) return
    isFirstRender.current = false
    const handler = async () => {
      try {
        const response = await fetch('/api/countries', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = { data: [] }
      } catch (error) {
        console.log(error)
      }
    }
    handler()
  }, [setCountry])

  return (
    <main>
      <h1>Gjett flagget</h1>
      <p className="flag">{country?.unicodeFlag}</p>
      <Strikes strikes={strikes} />
      <Words words={wordSplit()} />
      <Letters
        handleGuess={handleGuess}
        guesses={guesses}
        getMessage={getMessage}
      />
    </main>
  )
}

export default Home
