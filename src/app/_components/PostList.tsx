'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { formatPostDate } from '@/src/app/_utils/dateUtils';
import { Post } from '@prisma/client';
import { FaRegTrashCan } from "react-icons/fa6";
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
        <PostWrapper>
          <TitleWrapper>
          <PostTitle>{title}</PostTitle>
          <FaRegTrashCan color='#EF4444' />
          </TitleWrapper>
          <PostDate>{formattedDate}</PostDate>
        </PostWrapper>
      </Link>
    </PostListContainer>
  );
}
const PostListContainer = styled.div`
  padding: 20px 24px;
  background: #131313;
  margin: 20px;
  box-shadow: -1px -1px 1px rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
