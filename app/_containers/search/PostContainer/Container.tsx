'use client';

import Link from 'next/link';
import styled from 'styled-components';
import usePostData from './usePostData';
import Empty from '@/app/_components/EmptyContainer';
import PostList from '@/app/_components/PostList';

const ANNOUNCEMENT_DETAIL_URL = '/announcement/detail/';

export default function PostContainer() {
  const { posts, isLoading } = usePostData();

  if (!posts || posts.length === 0) {
    return <Empty />;
  }

  return (
    <PostContiner>
      {posts
        .map((post: any) => (
          <Link href={`${ANNOUNCEMENT_DETAIL_URL}${post.id}`} key={post.id}>
            <PostList post={post} />
          </Link>
        ))
        .reverse()}
    </PostContiner>
  );
}

const PostContiner = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 100%;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;
