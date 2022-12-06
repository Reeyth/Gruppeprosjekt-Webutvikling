import type { NextPage } from 'next'
import Nav from '../components/Nav';
import Settings from '../components/Settings';

const SettingsPage: NextPage = () => {

  return (
    <main>
      <Nav/>
      <Settings/>
    </main>
  )
}

export default SettingsPage
