"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { getAnnouncementById } from "@/app/_services/announcement";

export default function ContentWrapper({ params }: { params: { id: number } }) {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<string>("auto");

  useEffect(() => {
    getAnnouncementById(params.id)
      .then((data) => {
        if (contentRef.current) {
          contentRef.current.innerText = data.content;
          adjustTextAreaHeight();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function adjustTextAreaHeight() {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = contentRef.current.scrollHeight + "px";
    }
  }

  function handleInputChange() {
    adjustTextAreaHeight();
  }
  return (
    <ContentTextarea
      ref={contentRef}
      style={{ height: textAreaHeight }}
      onChange={handleInputChange}
    />
  );
}

const ContentTextarea = styled.textarea`
  margin: 32px 5px;
  margin-bottom: 16px;
  min-height: 300px;
  border: none;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  width: 100%;
  overflow: hidden;
`;
