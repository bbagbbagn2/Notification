import Link from "next/link"
import Image from "next/image"

export default function Logo() {
    return(
        <Link href="/">
            <Image src="/logo.svg"
            alt="Logo"
            width={166}
            height={26}
            />
        </Link>
    );
}