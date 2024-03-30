"use client";

import Link from "next/link";
import styled from "styled-components";
import EmptyContainer from "./components/EmptyContainer";
import SearchInput from "./components/SearchInput";

function formatPostDate(postDate: string): string {
  const currentDate = new Date();
  const date = new Date(postDate);
  const elapsedMilliseconds = currentDate.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  if (elapsedSeconds < 60) {
    return "방금 전";
  } else if (elapsedSeconds < 120) {
    return "1분 전";
  } else if (elapsedSeconds < 180) {
    return "2분 전";
  } else if (elapsedSeconds < 3600) {
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    return `${elapsedMinutes}분 전`;
  } else if (elapsedSeconds < 86400) {
    const elapsedHours = Math.floor(elapsedSeconds / 3600);
    return `${elapsedHours}시간 전`;
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  }
}

async function fetchPosts() {
  const res = await fetch("http://localhost:3000/api/announcement", {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await fetchPosts();

  console.log(posts);
  return (
    <PageLayout>
      <PageContainer>
        <TitleWrapper>
          <div>
            <Heading>공지사항</Heading>
          </div>
          <SearchInput />
        </TitleWrapper>
        {posts.length > 0 ? (
          <PostContiner>
            {posts.reverse().map((post: any) => (
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
          <EmptyContainer />
        )}
      </PageContainer>
    </PageLayout>
  );
}

const PageLayout = styled.div`
  padding-inline: 240px;
  position: relative;
  background-color: #fff;
`;

const PageContainer = styled.div`
  padding-inline: 160px;
`;

const TitleWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  height: 64px;
  justify-content: space-between;
`;

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.5%;
`;

const PostContiner = styled.div`
  margin-top: 12px;
  margin-bottom: 32px;
  width: 100%;
  height: 100%;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;

const PostList = styled.ul`
  padding: 16px 24px;
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
  cursor: pointer;

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
