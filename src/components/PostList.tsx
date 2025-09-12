'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Post } from '@prisma/client';
import { formatPostDate } from '@/src/app/_utils/dateUtils';
import DeleteModal from '@/src/components/DeleteModal';
import { FaRegTrashCan } from 'react-icons/fa6';

type PostProps = {
  post: Post;
};

const POST_DETAIL_URL = '/post/';

export default function PostList({ post }: PostProps) {
  const [modalStatus, setModalStatus] = useState(false);
  const { id, title, createdAt } = post;
  const formattedDate = formatPostDate(createdAt);

  const handleModalStatus = () => {
    setModalStatus(!modalStatus);
    console.log(modalStatus);
  };

  return (
    <PostListWrapper>
      <Link href={`${POST_DETAIL_URL}${id}`} key={id}>
        <PostWrapper>
          <TitleWrapper>
            <PostTitle>{title}</PostTitle>
            <DeleteWrapper>
              <FaRegTrashCan
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleModalStatus();
                }}
              />
            </DeleteWrapper>
          </TitleWrapper>
          <PostDate>{formattedDate}</PostDate>
        </PostWrapper>
      </Link>
      {modalStatus && <DeleteModal setModal={handleModalStatus} />}
    </PostListWrapper>
  );
}
const PostListWrapper = styled.div`
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

const DeleteWrapper = styled.div`
  color: #ef4444;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #dc2626;
  }

  &:active {
    color: #b91c1c;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #ef4444;
  }
`;
