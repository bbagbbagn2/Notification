import Link from "next/link"
import Image from "next/image"
import styled from "styled-components";
export default function Logo() {
    return(
        <IconBox>
            <Image src="/search.svg"
            alt="Search"
            width={24}
            height={24}
            />
        </IconBox>
    );
}

const IconBox = styled.div`
    width: auto;
    height: auto;
`;

