import Link from "next/link";
import styled from "styled-components";
import { formatPostDate } from "../_utils/dateUtils";

type PostProps = {
  post: {
    id: string;
    title: string;
    createdAt: string;
  };
};

export default async function Post({ post }: PostProps) {
  const { id, title, createdAt } = post;
  const formattedDate = formatPostDate(createdAt);

  return (
    <Link href={`/announcement/detail/${id}`}>
      <PostItem>
        <PostHeading>{title}</PostHeading>
        <PostDate>{formattedDate}</PostDate>
      </PostItem>
    </Link>
  );
}

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
