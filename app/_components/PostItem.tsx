'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { formatPostDate } from '@/app/_utils/dateUtils';
import { Post } from '@prisma/client'
import colors from '../_styles/theme';

type PostProps = {
  post: Post;
};

export default function PostItem({ post }: PostProps) {
  const { id, title, createdAt } = post;
  const formattedDate = formatPostDate(createdAt);

  return (
      <PostItemContainer>
        <Link href={`/post/${id}`}>
        <PostTitle>{title}</PostTitle>
        <PostDate>{formattedDate}</PostDate>
        </Link>
      </PostItemContainer>
  );
}

const PostItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostTitle = styled.p`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 23.04px;
  word-wrap: break-word;
`;

const PostDate = styled.p`
  color: ${colors.text200};
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  word-wrap: break-word;
`;
