'use client';

import styled from 'styled-components';
import InnerContainer from '@/app/_components/innerContainer';
import SearchHeader from '@/app/_components/SearchHeader';
import PostList from '@/app/_components/PostList';
import colors from '@/app/_styles/theme';
import { fetchPosts } from '@/app/_services/post';

type ContainerProps = {
  ApiURL: string;
};

const API_POST_URL = '/api/post/route';

export async function getServerSideProps() {
  const res = await fetch(`${API_POST_URL}`);
  const { posts } = await res.json();
  return {
    props: { posts },
  };
}

export default async function MainContainer({ ApiURL }: ContainerProps) {
  const posts = await fetchPosts(ApiURL);

  return (
    <InnerContainer>
      <SearchHeader />
      <PostContiner>
        {posts
          .map((post: any) => <PostList post={post} key={post.id} />)
          .reverse()}
      </PostContiner>
    </InnerContainer>
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
