"use client";

import styled from "styled-components";
import { formatPostDate } from "@/app/_utils/dateUtils";
import { Post } from "@/app/_types/Post";

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <PostList key={post.id}>
      <Item>
        <PostHeading>{post.title}</PostHeading>
        <PostDate>{formatPostDate(post.createdAt)}</PostDate>
      </Item>
    </PostList>
  );
}

const PostList = styled.ul`
  padding: 16px 24px;

  &:hover {
    background-color: #eff0f3;
  }
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
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
