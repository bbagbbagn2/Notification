'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type TitleWrapperProps = {
  params: {
    id: number;
  };
};

const POST_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/`;

export default function TitleWrapper({ params }: TitleWrapperProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${POST_API_URL}${params.id}`);

      const data = await res.json();
      setTitle(data.post.title);
    }

    fetchData();
  }, [params.id]);

  return (
    <TitleBox defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
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
