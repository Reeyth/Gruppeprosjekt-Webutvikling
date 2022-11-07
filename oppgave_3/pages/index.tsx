import type { NextPage } from 'next'

const Home: NextPage = () => {
  const dataFetch = async () => {
    try {
      const response = await fetch('/api/calender')
      const data = await response.json()
      console.log(data)
    } catch(error) {
      console.error(error)
    }
  }
  return (
    <main>
      <h1>Lunsjkalender</h1>
      <button onClick={dataFetch}>Get data</button>
    </main>
  )
}

export default Home
