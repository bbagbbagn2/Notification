'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { formatPostDate } from '@/src/app/_utils/dateUtils';
import { Post } from '@prisma/client';
import colors from '../../styles/theme';

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
  padding: 20px 24px;
  background: #131313;
  margin: 20px;
  box-shadow: -1px -1px 1px rgba(255, 255, 255, 0.2);
  border-radius: 50px;
`;

const PostListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
`;

const PostTitle = styled.p`
  color: white;
  font-size: 18px;
  word-wrap: break-word;
`;

const PostDate = styled.p`
  color: #777777;
  font-size: 14px;
  line-height: 100%;
  word-wrap: break-word;
`;
