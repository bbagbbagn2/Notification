'use client';

import styled from 'styled-components';
import { fetchPosts } from '@/app/_services/post';
import PostList from '@/app/_components/PostList';
import Link from 'next/link';

type PostContainerProps = {
  ApiURL: string;
};

const ANNOUNCEMENT_DETAIL_URL = '/announcement/detail/';

export default async function Home({ ApiURL }: PostContainerProps) {
  const posts = await fetchPosts(ApiURL);

  return (
    <PostContiner>
      {posts
        .map((post: any) => (
          <Link href={`${ANNOUNCEMENT_DETAIL_URL}${post.id}`}>
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
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;
