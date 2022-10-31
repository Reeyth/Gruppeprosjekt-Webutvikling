type WordProps = {
  words: string[][] | null
  isMatch: (letter: string) => string
}

export default function Words({ words, isMatch }: WordProps) {
  return (
    <ul className="country">
      {words?.map((word: string[], wordIndex: number) => (
        <li key={wordIndex}>
          {word.map((letter: string, index: number) => (
            <span key={`${letter}-${index}`}>{isMatch(letter)}</span>
          ))}
        </li>
      ))}
    </ul>
  )
}
