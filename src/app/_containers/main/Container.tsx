import { Suspense } from 'react';
import prisma from '@/src/app/lib/prisma';
import InnerContainer from '@/src/app/_components/innerContainer';
import SearchHeader from '@/src/app/_components/SearchHaeder';
import PostContainer from './PostContainer';
import PostList from '@/src/app/_components/PostList';
import Loading from '@/src/app/_components/Loading';

export default async function MainContainer() {
  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });

  return (
    <InnerContainer>
      <SearchHeader />
      <PostContainer>
        <Suspense fallback={<Loading />}>
          {posts.map((post: any) => (
            <PostList post={post} key={post.id} />
          ))}
        </Suspense>
      </PostContainer>
    </InnerContainer>
  );
}
