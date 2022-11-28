import type { NextPage } from 'next'
import Register from '../components/Register'
import Nav from '../components/Nav'

const CreatePage: NextPage = () => {
  return (
    <main>
      <Nav />
      <Register />
    </main>
  )
}

export default CreatePage
