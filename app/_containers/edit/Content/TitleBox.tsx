'use client';

import React from 'react';
import styled from 'styled-components';
import { useFetchData } from '../useFetchData';

type TitleWrapperProps = {
  params: {
    id: number;
  };
};

export default function TitleWrapper({ params }: TitleWrapperProps) {
  const titleRef = useFetchData(params.id, (data) => {
    if (titleRef.current) {
      titleRef.current.value = data.title;
      adjustTextAreaHeight();
    }
  });

  function adjustTextAreaHeight() {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }

  function handleInputChange() {
    adjustTextAreaHeight();
  }

  return (
    <TitleBox id="title" rows={1} ref={titleRef} onChange={handleInputChange} />
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
