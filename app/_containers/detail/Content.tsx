'use client';

import React from 'react';
import styled from 'styled-components';
import { usePost } from './usePost';
import colors from '@/app/_styles/theme';

type ContentProps = {
  id: number;
};

export default function Content({ id }: ContentProps) {
  const { post, loading, error } = usePost(id);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <TitleContainer>
        <Title>{post?.title}</Title>
      </TitleContainer>
      <DateContainer>
        <DateTitle>{post?.createdAt}</DateTitle>
      </DateContainer>
      <ContentContainer>{post?.content}</ContentContainer>
    </>
  );
}

const TitleContainer = styled.div`
  padding-bottom: 16px;
`;

const Title = styled.p`
  color: ${colors.text};
  font-size: 32px;
  font-weight: 600;
  line-height: 39.04px;
  word-wrap: break-word;
`;

const DateContainer = styled.div`
  height: auto;
`;

const DateTitle = styled.p`
  color: ${colors.text200};
  font-size: 16px;
  line-height: 100%;
  word-wrap: break-word;
`;

const ContentContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  padding: 32px 0;
  border-top: 1px solid ${colors.bg300};
  border-bottom: 1px solid ${colors.bg300};
  color: ${colors.text};
`;
