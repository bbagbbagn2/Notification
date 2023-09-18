import Link from "next/link"
import Image from "next/image"
import styled from "styled-components";
export default function Logo() {
    return(
        <IconLink href="/">
            <Image src="/search.svg"
            alt="Search"
            width={24}
            height={24}
            />
        </IconLink>
    );
}

const IconLink = styled(Link)`
    width: 24px;
    height: 24px;
`;

