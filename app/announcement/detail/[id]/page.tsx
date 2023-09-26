"use client";

import Link from "next/link";
import React, { Fragment, useEffect, useRef } from "react"
import styled from "styled-components"


function formatPostDate(postDate: string): string {
    const currentDate = new Date();
    const date = new Date(postDate);
    const elapsedMilliseconds = currentDate.getTime() - date.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    if (elapsedSeconds < 60) {
        return "방금 전";
    } else if (elapsedSeconds < 120) {
        return "1분 전";
    } else if (elapsedSeconds < 180) {
        return "2분 전";
    } else if (elapsedSeconds < 3600) {
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        return `${elapsedMinutes}분 전`;
    } else if (elapsedSeconds < 86400) {
        const elapsedHours = Math.floor(elapsedSeconds / 3600);
        return `${elapsedHours}시간 전`;
    } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}. ${month}. ${day}`;
    }
}

const deleteAnnouncement = async (id: number) => {
    const res = fetch(`http://localhost:3000/api/announcement/${id}`, {
        method: "DELETE",
    });
    return res;
}

const getAnnouncementById = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/announcement/${id}`);
    const data = await res.json();
    return data.post;
};

export default function Details({ params }: { params: { id: number } }) {
    const titleRef = useRef<HTMLParagraphElement | null>(null);
    const contentRef = useRef<HTMLParagraphElement | null>(null);
    const dateRef = useRef<HTMLParagraphElement | null>(null);
    
    useEffect(() => {
        getAnnouncementById(params.id)
            .then((data) => {
                if (titleRef.current && contentRef.current && dateRef.current) {
                    titleRef.current.innerText = data.title;
                    contentRef.current.innerText = data.content;
                    dateRef.current.innerText = formatPostDate(data.createdAt);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = async () => {
        const shouldDelete = window.confirm("정말 삭제하시겠습니까?");

        if (shouldDelete) {
            try {
                const res = await deleteAnnouncement(params.id);
                if (res.status === 200) {
                    window.location.href = "/";
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Fragment>
            <PageLayout>
                <PageContainer>
                    <NotificationBox>
                        <NotificationParagraph>공지사항</NotificationParagraph>
                    </NotificationBox>
                    <TitleBox>
                        <TitleHeading ref={titleRef} />
                    </TitleBox>
                    <DateBox>
                        <DateParagraph ref={dateRef} />
                    </DateBox>
                    <Contour Height="32px" />
                    <ContentBox ref={contentRef} />
                    <Contour Height="16px" />
                    <ButtonBox>
                        <Link href="/">
                            <CancelButton>
                                <CancelParapraph>목록으로</CancelParapraph>
                            </CancelButton>
                        </Link>
                        <Link href={`/announcement/edit/${params.id}`}>
                        <EditButton>
                            <EditParapraph>수정</EditParapraph>
                        </EditButton>
                        </Link>
                        <DeleteButton onClick={handleDelete}>
                            <DeleteParagraph>삭제</DeleteParagraph>
                        </DeleteButton>
                    </ButtonBox>
                </PageContainer>
            </PageLayout>
        </Fragment>
    );
}

const PageLayout = styled.div`
  padding: 0 15%;
  position: relative;
  background-color: #FFF;
  z-index: 1;
`;

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 0 14.287%;
  padding-top: 60px;
  padding-bottom: 64px;
  width: 100%;
  height: 100%;
`;

const NotificationBox = styled.div`
  padding-bottom: 24px;
  position: relative;
  width: 100%;
  height: 40px;
 `;

const NotificationParagraph = styled.p`
  color: #222;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.08px;
`;

const TitleBox = styled.div`
  margin-bottom: 16px;
  position: relative;
  width: 100%;
  height: auto;
 `;

const TitleHeading = styled.p`
    color: #222222;
    font-size: 32px;
    font-weight: 600;
    line-height: 39.04px;
    word-wrap: break-word;
`;

const DateBox = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const DateParagraph = styled.p`
  color: #787878;
  font-size: 16px;
  line-height: 100%;
  word-wrap: break-word;
`;

const Contour = styled.div<{ Height: string }>`
    width: 100%;

    height: ${(props) => props.Height};
`;

const ContentBox = styled.div`
    padding: 32px 0;
    width: 100%;
    height: 80%;
    border-top: 1px solid #DEDEDE;
    border-bottom: 1px solid #DEDEDE;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: auto;
`;

const CancelButton = styled.button`
    margin-right: 16px;
    padding: 8px 12px;
    border: 0.5px solid #DEDEDE;
    border-radius: 6px;
    background-color: #FFF;
    cursor: pointer;
`;
const CancelParapraph = styled.p`
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.08px;
`;

const EditButton = styled.button`
    margin-right: 16px;
    padding: 8px 12px;
    border: 0.5px solid #FF5C00;
    border-radius: 6px;
    background-color: #FF5C00;
    cursor: pointer;
`;
const EditParapraph = styled(CancelParapraph)`
  color: #FFF;
`;

const DeleteButton = styled.button`
    padding: 8px 12px;
    border: 0.5px solid #FF0000;
    border-radius: 6px;
    background-color: #FF0000;
    cursor: pointer;
`;
const DeleteParagraph = styled(EditParapraph)``;