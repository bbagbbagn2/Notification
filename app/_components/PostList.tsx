'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { formatPostDate } from '@/app/_utils/dateUtils';
import { Post } from '@prisma/client';
import colors from '../_styles/theme';

type PostProps = {
  post: Post;
};

const POST_DETAIL_URL = '/post/';

export default function PostList({ post }: PostProps) {
  const { id, title, createdAt } = post;
  const formattedDate = formatPostDate(createdAt);

  return (
    <PostListContainer>
      <Link href={`${POST_DETAIL_URL}${id}`} key={id}>
        <PostListItem>
          <PostTitle>{title}</PostTitle>
          <PostDate>{formattedDate}</PostDate>
        </PostListItem>
      </Link>
    </PostListContainer>
  );
}
const PostListContainer = styled.div`
  padding: 16px 24px;

  &:hover {
    background-color: ${colors.bg200};
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }
`;

const PostListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
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
