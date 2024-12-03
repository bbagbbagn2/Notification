'use client';

import styled from 'styled-components';
import PostList from '@/app/_components/PostList';
import colors from '@/app/_styles/theme';
import { fetchPosts } from '@/app/_services/post';

type PostContainerProps = {
  ApiURL: string;
};

export default async function PostContainer({ ApiURL }: PostContainerProps) {
  const posts = await fetchPosts(ApiURL);

  return (
    <Container>
      {posts
        .map((post: any) => <PostList post={post} key={post.id} />)
        .reverse()}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 12px;
  margin-bottom: 32px;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${colors.bg300};
  border-bottom: 1px solid ${colors.bg300};
`;
