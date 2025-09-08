import InnerContainer from '@/app/_components/innerContainer';
import SearchHeader from '@/app/_components/SearchHeader';
import PostContainer from './PostContainer/Container';

export default function SearchContainer() {
  return (
    <InnerContainer>
      <SearchHeader />
      <PostContainer />
    </InnerContainer>
  );
}
