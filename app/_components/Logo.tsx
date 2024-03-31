import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/Notification logo.svg";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="logo" width={166} height={26} />
    </Link>
  );
}
