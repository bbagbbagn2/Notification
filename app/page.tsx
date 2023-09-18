//import { useEffect, useState } from "react"
//import { Router } from "next/router"
'use client'

import Image from "next/image"
import styled from "styled-components"

import Header from "../components/Header"
import Search from "../components/Search"


export default async function Home() {

    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const start = () => {
    //         setLoading(true);
    //     };
    //     const end = () => {
    //         setLoading(false);
    //     };

    //     Router.events.on("routeChangeStart", start);
    //     Router.events.on("routeChangeComplete", end);
    //     Router.events.on("routeChangeError", end);

    //     return () => {
    //         Router.events.off("routeChangeStart", start);
    //         Router.events.off("routeChangeComplete", end);
    //         Router.events.off("routeChangeError", end);
    //     };
    // }, []);

    return (
            <PageLayout>
                <PageContainer>
                    <AnnouncementBox>
                        <TitleBox>
                            <div>
                                <TitleHeading>공지사항</TitleHeading>
                            </div>
                            <SearchBox>
                                <SearchInput type="text" placeholder="검색어"></SearchInput>
                                <Search />
                            </SearchBox>
                        </TitleBox>
                        <Contour />
                        <EmptyMessageContainer>

                            <EmptyMessageBox>
                                {/* {loading ? (
                                    <Image src="/Loading.svg"
                                        alt="Loading"
                                        width={64}
                                        height={48}
                                    />
                                ) : ( */}
                                    <EmptyMessageParagraph>공지사항이 없습니다.</EmptyMessageParagraph>

                                {/* )} */}
                            </EmptyMessageBox>
                        </EmptyMessageContainer>
                    </AnnouncementBox>
                </PageContainer>
            </PageLayout>
    );
}

const PageLayout = styled.div`
        padding: 0 15%;
        position: relative;
        height: 90vh;
        background-color: #FFF;
        z-index: 1;
    `;

const PageContainer = styled.div`
        margin: 0 auto;
        padding: 0 14.287%;
        width: 100%;
        height: 100%;
    `;

const AnnouncementBox = styled.div`
        margin: 0 auto;
        padding-top: 60px;
        padding-bottom: 64px;
        position: relative;
    `;

const TitleBox = styled.div`
        padding-bottom: 24px;
        position: relative;
        width: 100%;
        height: 64px;
        display: grid;
        grid-template-columns: 1fr 280px;
        justify-content: space-between;
    `;
const TitleHeading = styled.h2`
        font-size: 32px;
        font-weight: 600;
        line-height: 100%;
        letter-spacing: -0.16px;
    `;

const Contour = styled.div`
        width: 100%;
        height: 12px;
    `;

const EmptyMessageContainer = styled.div`
        margin: 0 auto;
        padding: 8px 13.75%;
        height: 178px;
        border-top: 1px solid #DEDEDE;
        border-bottom: 1px solid #DEDEDE;
    `;

const EmptyMessageBox = styled.div`
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
    `;

const EmptyMessageParagraph = styled.p`
        color: #707070; 
        font-size: 16px;
        font-weight: 400;
        line-height: 180%;
        letter-spacing: -0.08px;
        
    `;

const SearchBox = styled.div`
        padding: 8px 12px;
        width: 280px;
        height: 40px;
        display: grid;
        grid-template-columns: 1fr 24px;
        align-items: center;
        background-color: #FFF;
        border: 0.8px solid #222222;
        border-radius: 6px;
    `;

const SearchInput = styled.input`
        width: 100%;
        color:  #222222;
        font-size: 16px;
        line-height: 100%;
        letter-spacing: -0.08px;
        border: 0;

        &::placeholder {
            color: #CBCBCB;
        }

        &:focus {
            outline: none;
        }
    `;