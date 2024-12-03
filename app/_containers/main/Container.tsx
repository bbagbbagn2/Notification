import InnerContainer from '@/app/_components/innerContainer';
import SearchHeader from '@/app/_components/SearchHeader';
import PostContainer from './PostContainer';

type ContainerProps = {
  ApiURL: string;
};

export default function MainContainer({ ApiURL }: ContainerProps) {
  return (
    <InnerContainer>
      <SearchHeader />
      <PostContainer ApiURL={ApiURL} />
    </InnerContainer>
  );
}