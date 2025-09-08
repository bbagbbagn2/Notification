'use client';

import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import useSWR from 'swr';
import Empty from '@/app/_components/EmptyContainer';
import { fetchPosts } from '@/app/_services/post';
import PostList from '@/app/_components/PostList';

const SEARCH_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/search`;

export default function PostContainer() {
  const search = useSearchParams();
  const searchQuery = search?.get('q') || '';
  const encodedSearchQuery = encodeURI(searchQuery || '');

  const { data, isLoading } = useSWR(
    `${SEARCH_API_URL}?q=${encodedSearchQuery}`,
    fetchPosts,
  );

  if (!data?.posts || data.posts.length === 0) {
    return <Empty />;
  }

  return (
    <PostContiner>
      {data.posts
        .map((post: any) => <PostList post={post} key={post.id} />)
        .reverse()}
    </PostContiner>
  );
}

const PostContiner = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 100%;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`;
