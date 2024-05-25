'use client';

import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useFetchData } from '../useFetchData';

type ContentWrapperProps = {
  params: {
    id: number;
  };
};

export default function ContentWrapper({ params }: ContentWrapperProps) {
  const contentRef = useFetchData(params.id, (data) => {
    if (contentRef.current) {
      contentRef.current.value = data.content;
      adjustTextAreaHeight(contentRef.current);
    }
  });

  function adjustTextAreaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    adjustTextAreaHeight(event.target);
  }

  return <ContentTextarea ref={contentRef} onChange={handleInputChange} />;
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
