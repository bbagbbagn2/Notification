"use client";

import React, {
  useState,
  useRef,
  ChangeEvent,
  Fragment,
  useEffect,
} from "react";
import styled from "styled-components";
import InnerContainer from "@/app/_components/innerContainer";
import TitleWrapper from "@/app/_containers/edit/TitleBox";
import DateWrapper from "@/app/_containers/edit/DateBox";
import ContentWrapper from "@/app/_containers/edit/ContentBox";
import ButtonBar from "@/app/_containers/edit/ButtonBar";

type UpadateAnnouncementParams = {
  title: string;
  content: string;
  id: number;
};

const updateAnnouncement = async (data: UpadateAnnouncementParams) => {
  const res = fetch(`http://localhost:3000/api/announcement/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, content: data.content }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const getAnnouncementById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/announcement/${id}`);
  const data = await res.json();
  return data.post;
};

export default function Edit({ params }: { params: { id: number } }) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const [initialContent, setInitialContent] = useState("");

  useEffect(() => {
    getAnnouncementById(params.id)
      .then((data) => {
        if (titleRef.current && contentRef.current) {
          titleRef.current.value = data.title;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const autoResizeTextarea = () => {
    const textarea = titleRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <Fragment>
      <InnerContainer paddingBottom="242px">
        <NotificationBox>
          <NotificationParagraph>공지사항</NotificationParagraph>
        </NotificationBox>
        <TitleWrapper params={{ id: params.id }} />
        <DateWrapper params={{ id: params.id }} />
        <ContentWrapper params={{ id: params.id }} />
        <ButtonBar params={{ id: params.id }} />
      </InnerContainer>
    </Fragment>
  );
}

const NotificationBox = styled.div`
  margin-top: 60px;
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