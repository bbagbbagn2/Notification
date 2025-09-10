import Link from 'next/link';
import Image from 'next/image';
import { Logo_white } from '@/public/svgs';

export default function Logo() {
  return (
    <Link href="/">
      <Image src={Logo_white} alt="logo" width={120} />
    </Link>
  );
}
