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
            </>
        </nav>
    )}

export default Nav