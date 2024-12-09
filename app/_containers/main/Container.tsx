import prisma from '@/app/lib/prisma';
import InnerContainer from '@/app/_components/innerContainer';
import SearchHeader from '@/app/_components/SearchHeader';
import PostContainer from './PostContainer';
import PostList from '@/app/_components/PostList';

export default async function MainContainer() {
  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });

  return (
    <InnerContainer>
      <SearchHeader />
      <PostContainer>
        {posts.map((post: any) => (
          <PostList post={post} key={post.id} />
        ))}
      </PostContainer>
    </InnerContainer>
  );
}
