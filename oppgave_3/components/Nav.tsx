import Link from 'next/link'

const Nav = () => {

  const runDemo = async () => {
    const response = await fetch('/api/demo')
    const data = await response.json()
    document.location.reload()
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
      </>
    </nav>
  )
}

export default Nav
