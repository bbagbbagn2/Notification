import InnerContainer from '@/app/_components/innerContainer';
import SearchHeader from '@/app/_components/SearchHeader';
import PostContainer from './PostContainer';
import { fetchPosts } from '@/app/_services/post';

type ContainerProps = {
  ApiURL: string;
};

export default async function MainContainer({ ApiURL }: ContainerProps) {
  const posts = await fetchPosts(ApiURL);

  return (
    <InnerContainer>
      <SearchHeader />
      <PostContainer posts={posts} />
    </InnerContainer>
  );
}
