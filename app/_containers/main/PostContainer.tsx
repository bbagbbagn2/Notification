'use client';

import styled from 'styled-components';
import PostList from '@/app/_components/PostList';
import Link from 'next/link';
import colors from '@/app/_styles/theme';

type PostContainerProps = {
  posts: any[];
};

const ANNOUNCEMENT_DETAIL_URL = '/announcement/detail/';

export default async function Home({ posts }: PostContainerProps) {
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
  margin-bottom: 32px;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${colors.bg300};
  border-bottom: 1px solid ${colors.bg300};
`;
