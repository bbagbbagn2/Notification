"use client";

import Link from "next/link";
import styled from "styled-components";
import usePostData from "./usePostData";
import Empty from "@/app/_components/emptyContainer";
import PostList from "@/app/_components/PostList";

const ANNOUNCEMENT_DETAIL_URL = "/announcement/detail/";

export default function PostContainer() {
  const { data, isLoading } = usePostData();

  

  if (!data) {
    return null;
  }

  return (
    <>
      {data.length > 0 ? (
        <PostContiner>
          {data
            .map((post: any) => (
              <Link href={`${ANNOUNCEMENT_DETAIL_URL}${post.id}`}>
                <PostList post={post} />
              </Link>
            ))
            .reverse()}
        </PostContiner>
      ) : (
        <Empty />
      )}
    </>
  );
}

const PostContiner = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 100%;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;
