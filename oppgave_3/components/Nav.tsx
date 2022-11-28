import Link from 'next/link'

const Nav = () => {
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
        <Link href="/randomize">
          <a>Miks uker</a>
        </Link>
        <Link href="/personnellist">
          <a>Personalliste</a>
        </Link>
        <Link href="/updateEmployee">
          <a>Ansatt</a>
        </Link>
      </>
    </nav>
  )
}

export default Nav
