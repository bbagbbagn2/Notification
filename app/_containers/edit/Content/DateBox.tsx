'use client';

import React, { LegacyRef } from 'react';
import styled from 'styled-components';
import { formatPostDate } from '@/app/_utils/dateUtils';
import { useFetchData } from '../useFetchData';

type DateWrapperProps = {
  params: {
    id: number;
  };
};

export default function DateWrapper({ params }: DateWrapperProps) {
  const dateRef = useFetchData(params.id, (data) => {
    if (dateRef.current) {
      dateRef.current.innerText = formatPostDate(data.createdAt);
    }
  });

  return (
    <DateBox>
      <DateParagraph ref={dateRef as LegacyRef<HTMLParagraphElement>} />
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
