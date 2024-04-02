import Link from "next/link";
import styled from "styled-components";
import { formatPostDate } from "@/app/_utils/dateUtils";
import { Post } from "@/app/_types/Post";

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
    background-color: #eff0f3;
  }
`;
const PostItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostHeading = styled.p`
  color: #222222;
  font-size: 16px;
  font-weight: 400;
  line-height: 23.04px;
  word-wrap: break-word;
`;

const PostDate = styled.p`
  color: #707070;
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  word-wrap: break-word;
`;
