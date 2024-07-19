import styled from 'styled-components';
import { formatPostDate } from '@/app/_utils/dateUtils';
import { Post } from '@/app/_types/Post';
import colors from '../_styles/theme';

type PostProps = {
  post: Post;
};

export default function PostList({ post }: PostProps) {
  const { id, title, createdAt } = post;
  const formattedDate = formatPostDate(createdAt);

  return (
    <List key={id}>
      <PostItem>
        <PostHeading>{title}</PostHeading>
        <PostDate>{formattedDate}</PostDate>
      </PostItem>
    </List>
  );
}
const List = styled.ul`
  padding: 16px 24px;

  &:hover {
    background-color: ${colors.bg200};
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }
`;
const PostItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostHeading = styled.p`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 23.04px;
  word-wrap: break-word;
`;

const PostDate = styled.p`
  color: ${colors.text200};
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  word-wrap: break-word;
`;
