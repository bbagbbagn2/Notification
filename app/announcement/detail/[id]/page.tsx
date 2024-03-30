"use client";

import Link from "next/link";
import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";

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
};

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
  };

  return (
    <Fragment>
      <PageLayout>
        <PageContainer>
          <NotificationWrapper>
            <p>공지사항</p>
          </NotificationWrapper>
          <TitleBox>
            <TitleHeading ref={titleRef} />
          </TitleBox>
          <DateBox>
            <DateParagraph ref={dateRef} />
          </DateBox>
          <ContentBox ref={contentRef} />
          <ButtonBox>
            <Link href="/">
              <BackButton>
                <Text color="#000">목록으로</Text>
              </BackButton>
            </Link>
            <Link href={`/announcement/edit/${params.id}`}>
              <EditButton>
                <Text>수정</Text>
              </EditButton>
            </Link>
            <DeleteButton onClick={handleDelete}>
              <Text>삭제</Text>
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
  background-color: #fff;
`;

const PageContainer = styled.div`
  padding: 0 14.287%;
`;

const NotificationWrapper = styled.div`
  margin-top: 60px;
  height: 40px;

  & > p {
    color: #222;
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.08px;
  }
`;

const TitleBox = styled.div`
  padding-bottom: 16px;
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
  height: auto;
`;

const DateParagraph = styled.p`
  color: #787878;
  font-size: 16px;
  line-height: 100%;
  word-wrap: break-word;
`;

const ContentBox = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  padding: 32px 0;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;

const ButtonBox = styled.div`
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 6px;
`;

const BackButton = styled(Button)`
  background-color: #fff;
  border: 0.5px solid #dedede;
`;

const EditButton = styled(Button)`
  border: 0.5px solid #ff5c00;
  background-color: #ff5c00;
`;

const DeleteButton = styled(Button)`
  border: 0.5px solid #ff0000;
  background-color: #ff0000;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.08px;
  color: ${props => props.color ? "#000" : "#fff" };
`;