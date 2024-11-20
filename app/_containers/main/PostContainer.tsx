import styled from 'styled-components';
import PostList from '@/app/_components/PostList';
import colors from '@/app/_styles/theme';

const API_POST_URL = '/api/post/route';

export async function getServerSideProps() {
  const res = await fetch(`${API_POST_URL}`);
  const { posts } = await res.json();
  return {
    props: { posts },
  };
}

type PostContainerProps = {
  posts: any[];
};

export default async function Home({ posts }: PostContainerProps) {
  return (
    <PostContiner>
      {posts
        .map((post: any) => <PostList post={post} key={post.id} />)
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
