'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatPostDate } from '@/app/_utils/dateUtils';
import { getAnnouncementById } from '@/app/_services/announcement';

export default function Content({ params }: { params: { id: number } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    getAnnouncementById(params.id)
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setDate(formatPostDate(data.createdAt));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  return (
    <>
      <TitleBox>
        <TitleHeading>{title}</TitleHeading>
      </TitleBox>
      <DateBox>
        <DateParagraph>{date}</DateParagraph>
      </DateBox>
      <ContentBox>{content}</ContentBox>
    </>
  );
}

const TitleBox = styled.div`
  padding-bottom: 16px;
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
