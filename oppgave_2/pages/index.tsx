import type { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/students')
        const data = await response.json()
        console.log(data)
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
