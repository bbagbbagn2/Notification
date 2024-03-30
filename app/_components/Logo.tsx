import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  href: string;
};

export default function Logo({
  src,
  alt,
  width = 166,
  height = 26,
  href,
}: LogoProps) {
  return (
    <Link href={href}>
      <Image src={src} alt={alt} width={width} height={height} />
    </Link>
  );
}
