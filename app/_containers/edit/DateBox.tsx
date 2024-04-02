"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { formatPostDate } from "@/app/_utils/dateUtils";
import { getAnnouncementById } from "@/app/_services/announcement";

export default function DateWrapper({ params }: { params: { id: number } }) {
  const dateRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    getAnnouncementById(params.id)
      .then((data) => {
        if (dateRef.current) {
          dateRef.current.innerText = formatPostDate(data.createdAt);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <DateBox>
      <DateParagraph ref={dateRef} />
    </DateBox>
  );
}

const DateBox = styled.div`
  margin-top: 16px;
`;

const DateParagraph = styled.p`
  color: #787878;
  font-size: 16px;
  line-height: 100%;
  word-wrap: break-word;
`;