"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SearchInput from "./_components/SearchInput";
import { fetchPosts } from "./_services/post";
import Post from "./_components/Post";

const ANNOUNCEMENT_API_URL = "http://localhost:3000/api/announcement";

export default async function Home() {
  
  const posts = await fetchPosts(ANNOUNCEMENT_API_URL);

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
        <PostContiner>
          {posts.reverse().map((post: any) => (
            <PostList key={post.id}>
              <Post post={post} />
            </PostList>
          ))}
        </PostContiner>
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
