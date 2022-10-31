import type { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    const handler = async () => {
      try {
      } catch (error) {
        console.log(error)
      }
    }
    handler()
  }, [])

  return (
    <main>
      <h1>Student gruppering</h1>
    </main>
  )
}

export default Home
