"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { getAnnouncementById } from "@/app/_services/announcement";

export default function TitleWrapper({ params }: { params: { id: number } }) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<string>("auto");

  useEffect(() => {
    getAnnouncementById(params.id)
      .then((data) => {
        if (titleRef.current) {
          titleRef.current.innerText = data.title;
          adjustTextAreaHeight();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function adjustTextAreaHeight() {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }

  function handleInputChange() {
    adjustTextAreaHeight();
  }

  return (
    <TitleBox
      id="title"
      rows={1}
      ref={titleRef}
      style={{ height: textAreaHeight }}
      onChange={handleInputChange}
    />
  );
}

const TitleBox = styled.textarea`
  padding: 16px 12px;
  width: 100%;
  border: 0.8px solid #dedede;
  border-radius: 6px;
  color: #222;
  font-size: 32px;
  font-weight: 600;
  line-height: 122%;
  letter-spacing: -0.16px;
  overflow: hidden;

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
