// TODO: Her er det bugs

const letterList = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ')

type LettersProps = {
  getMessage: () => string
  guesses: string[]
  handleGuess: (letter: string) => void
}

type LetterProps = Pick<LettersProps, 'handleGuess' | 'guesses'> & {
  letter: string
}

export default function Letters({
  handleGuess,
  guesses,
  getMessage,
}: LettersProps) {
  return (
    <>
      <p className="message">{getMessage()}</p>
      <ul className="letters">
        {/* CHANGE: Again, we changed from forEach to map for looping through the list. We also added a ? to ensure it's not undefined */}
        {letterList?.map((letter) => {
          {/* CHANGE: Since we are using map and not forEach, we have to return the component we want to render.*/}
          return(
          <Letter
            key={letter}
            handleGuess={handleGuess}
            guesses={guesses}
            letter={letter}
          />
        )})}
      </ul>
    </>
  )
}

const Letter = ({ letter, handleGuess, guesses }: LetterProps) => {
  const letterMatch = guesses.includes(letter.toLowerCase())
  return (
    <button
      onClick={() => handleGuess(letter)}
      disabled={letterMatch}
      className={`letter ${letterMatch ? 'highlight' : ''}`}
    >
      {letter}
    </button>
  )
}
