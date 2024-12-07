'use client';

import React, { LegacyRef } from 'react';
import styled from 'styled-components';
import { formatPostDate } from '@/app/_utils/dateUtils';
import { useFetchData } from '../useFetchData';

type DateWrapperProps = {
  date: string;
};

export default function DateWrapper({ date }: DateWrapperProps) {
  const parsedDate = new Date(date);
  const formattedDate = formatPostDate(parsedDate);

  return (
    <DateBox>
      <DateParagraph>{formattedDate}</DateParagraph>
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
