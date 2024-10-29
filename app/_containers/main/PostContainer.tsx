import styled from 'styled-components';
import PostList from '@/app/_components/PostList';
import Link from 'next/link';
import { Post } from '@/app/_types/Post';
import colors from '@/app/_styles/theme';

const ANNOUNCEMENT_DETAIL_URL = '/announcement/detail/';
const ANNOUNCEMENT_API_URL = '/api/announcement/route';

export async function getServerSideProps() {
  const res = await fetch(`${ANNOUNCEMENT_API_URL}`);
  const { posts } = await res.json();

  return {
    props: { posts },
  };
}

type PostContainerProps = {
  posts: Post[];
};

export default async function Home({ posts }: PostContainerProps) {
  return (
    <PostContainer>
      {posts
        .map((post: Post) => (
          <Link href={`${ANNOUNCEMENT_DETAIL_URL}${post.id}`} key={post.id}>
            <PostList post={post} />
          </Link>
        ))
        .reverse()}
    </PostContainer>
  );
}

const PostContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 32px;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${colors.bg300};
  border-bottom: 1px solid ${colors.bg300};
`;
