"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import styled from "styled-components";
import Post from "../../_components/Post";
import InnerContainer from "../../_components/innerContainer";
import SearchInput from "../../_components/SearchInput";
import { fetchPosts } from "../../_services/post";
import { formatPostDate } from "../../_utils/dateUtils";
import Empty from "../../_components/emptyContainer";

export default function SearchPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const endcodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${endcodedSearchQuery}`,
    fetchPosts
  );

  if (!data) {
    return null;
  }

  return (
    <InnerContainer>
      <AnnouncementBox>
        <TitleBox>
          <div>
            <TitleHeading>공지사항</TitleHeading>
          </div>
          <SearchInput />
        </TitleBox>
        <Contour />
        {data.length > 0 ? (
          <PostContiner>
            {data.reverse().map((post: any) => (
              <PostList key={post.id}>
                <Link href={`/announcement/detail/${post.id}`}>
                  <PostItem>
                    <PostHeading>{post.title}</PostHeading>
                    <PostDate>{formatPostDate(post.createdAt)}</PostDate>
                  </PostItem>
                </Link>
              </PostList>
            ))}
          </PostContiner>
        ) : (
          <Empty />
        )}
      </AnnouncementBox>
    </InnerContainer>
  );
}

const AnnouncementBox = styled.div`
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 64px;
  position: relative;
`;

const TitleBox = styled.div`
  padding-bottom: 24px;
  position: relative;
  width: 100%;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr 280px;
  justify-content: space-between;
`;

const TitleHeading = styled.h2`
  font-size: 32px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.16px;
`;

const Contour = styled.div`
  width: 100%;
  height: 12px;
`;

const PostContiner = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;

const PostList = styled.ul`
  padding: 16px 24px;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: #eff0f3;
  }
`;

const PostItem = styled.li`
  display: grid;
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
