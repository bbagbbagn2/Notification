"use client";

import React, {
  useState,
  useRef,
  ChangeEvent,
  Fragment,
  useEffect,
} from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import InnerContainer from "@/app/_components/innerContainer";

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
  const router = useRouter();
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
        <form>
          <TitleBox>
            <TitleBoxTextArea
              rows={1}
              spellCheck="false"
              ref={titleRef}
              onInput={autoResizeTextarea}
              maxLength={100}
            />
          </TitleBox>
          <EditWrapper></EditWrapper>
          <ButtonBox>
            <CancelButton>
              <CancelParapraph>취소</CancelParapraph>
            </CancelButton>
            <SaveButton type="submit">
              <SaveParapraph>저장</SaveParapraph>
            </SaveButton>
          </ButtonBox>
        </form>
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

const TitleBox = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const TitleBoxTextArea = styled.textarea`
  padding: 16px 12px;
  width: 100%;
  height: 100%;
  border: 0.8px solid #dedede;
  border-radius: 6px;
  color: #222;
  font-size: 32px;
  font-weight: 600;
  line-height: 122%;
  letter-spacing: -0.16px;
  resize: none;

  &:hover,
  &:active {
    border: 0.8px solid #222222;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    border: 0.8px solid #dedede;
    background-color: #eff0f3;
  }
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
  letter-spacing: -0.08px;
`;
const EditWrapper = styled.div`
  margin-top: 32px;
  padding: 3px;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 64px;
`;

const CancelButton = styled.button`
  margin-right: 16px;
  padding: 8px 12px;
  border: 0.5px solid #dedede;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
`;
const CancelParapraph = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.08px;
`;

const SaveButton = styled.button`
  padding: 8px 12px;
  border: 0.5px solid #ff5c00;
  border-radius: 6px;
  background-color: #ff5c00;
  cursor: pointer;
`;
const SaveParapraph = styled(CancelParapraph)`
  color: #fff;
`;
