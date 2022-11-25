import type { NextPage } from 'next'
import Nav from '../components/Nav';
import PersonnelList from '../components/PersonnelList';

const PeronnelListPage: NextPage = () => {

  return (
    <main>
      <Nav/>
      <PersonnelList/>
    </main>
  )
}

export default PeronnelListPage
