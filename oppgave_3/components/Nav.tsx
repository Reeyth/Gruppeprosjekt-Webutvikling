import Link from "next/link";

const Nav = () => {
    return (
        <nav>
            <>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/create">
                <a>Register</a>
            </Link>
            <Link href="/updateweek">
            <a>Update week</a>
            </Link>
            <Link href="/randomize">
            <a>Mix weeks</a>
            </Link>
            </>
        </nav>
    )}

export default Nav