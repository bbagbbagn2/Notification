"use client";

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import useSWR from 'swr'
import styled from "styled-components"
import { Post } from "@prisma/client"

import SearchInput from "../_components/SearchInput";
import EmptyContainer from "../_components/EmptyContainer"

function formatPostDate(postDate: string): string{
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
      return `${ year }. ${ month }. ${ day }`;
    }
}

async function fetchPosts(url: string) {
    const res = await fetch(url, {
        next: {
            revalidate: 10,
        },
    })

    if (!res.ok) {
        throw new Error("Failed to fetch potsts");
    }

    return res.json();
}

export default function SearchPage() {

    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;
    const endcodedSearchQuery = encodeURI(searchQuery || "");

    const { data, isLoading } = useSWR< {posts: Array<Post>}>(`/api/search?q=${endcodedSearchQuery}`,
        fetchPosts,
    );

    if(!data?.posts) {
        return null;
    }

    console.log(data);
    return (
        <PageLayout>
            <PageContainer>
                <AnnouncementBox>
                    <TitleBox>
                        <div>
                            <TitleHeading>공지사항</TitleHeading>
                        </div>
                        <SearchInput />
                    </TitleBox>
                    <Contour />
                    {data.posts.length > 0 ? (
                    <PostContiner>
                    {data.posts.reverse().map((post: any) => (
                                <PostList key={post.id}>
                                    <Link 
                                    href={`/announcement/detail/${post.id}`}
                                    > 
                                    <PostItem>
                                        <PostHeading>{post.title}</PostHeading> 
                                        <PostDate>{formatPostDate(post.createdAt)}</PostDate>
                                    </PostItem>
                                    </Link>
                                </PostList>
                            ))
                            }
                    </PostContiner>
                    ) : (
                        <EmptyContainer />
                    )}
                </AnnouncementBox>
            </PageContainer>
        </PageLayout>
    );
}

const PageLayout = styled.div`
    padding: 0 15%;
    position: relative;
    height: 90vh;
    background-color: #FFF;
    z-index: 1;
`;

const PageContainer = styled.div`
    margin: 0 auto;
    padding: 0 14.287%;
    width: 100%;
    height: 100%;
`;

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
`
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