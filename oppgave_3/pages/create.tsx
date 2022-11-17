import type { NextPage } from 'next'
import CreateUser from '../components/CreateUser';
import Nav from '../components/Nav';


const Create: NextPage = () => {

  return (
    <main>
        <Nav/>
      <CreateUser/>
    </main>
  )
}

export default Create
