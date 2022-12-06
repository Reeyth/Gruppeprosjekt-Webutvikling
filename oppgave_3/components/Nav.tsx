import Link from 'next/link'
import { useState } from 'react'

const Nav = () => {

  const [success, setSuccess] = useState<boolean>(false)

  const runDemo = async () => {
    const response = await fetch('/api/demo')
    const data = await response.json()
    if(data.success === true) {
      setSuccess(true)
      document.location.reload()
    } else {
      alert('Det skjedde en feil i oppdateringen')
    }
  }

  const runAlgo = async () => {
    const responseAlgo = await fetch('/api/algo')
    const data = await responseAlgo.json()
    if(data.success === true) {
      setSuccess(true)
      document.location.reload()
    } else {
      alert('Det skjedde en feil i oppdateringen')
    }
  }

  return (
    <nav>
      <>
        <Link href="/">
          <a>Hjem</a>
        </Link>
        <Link href="/search">
          <a>Søk</a>
        </Link>
        <Link href="/create">
          <a>Registrer</a>
        </Link>
        <Link href="/span">
          <a>Periode søk</a>
        </Link>
        <Link href="/update">
          <a>Oppdater uke</a>
        </Link>
        <Link href="/updateEmployee">
          <a>Ansatt</a>
        </Link>
        <Link href="/personnellist">
          <a>Personalliste</a>
        </Link>
        <Link href="/settings">
          <a>Instillinger</a>
        </Link>
        <button onClick={() => runDemo()}>Demo</button>
        {success ? <p>Suksess, oppdaterer...</p> : null}
        <button onClick={() => runAlgo()}>Algoritme</button>
      </>
    </nav>
  )
}

export default Nav
