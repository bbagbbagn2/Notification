'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFetchData } from '../useFetchData';

type ContentWrapperProps = {
  params: {
    id: number;
  };
};

const POST_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/`;

export default function ContentWrapper({ params }: ContentWrapperProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${POST_API_URL}${params.id}`);

      const data = await res.json();
      setContent(data.post.content);
    }

    fetchData();
  }, [params.id]);

  return (
    <ContentTextarea
      defaultValue={content}
      onChange={(e) => setContent(e.target.value)}
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
