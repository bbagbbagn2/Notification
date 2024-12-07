import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { fetchPosts } from '@/app/_services/post';
import { Post } from '@/app/_types/Post';

const SEARCH_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/search`;

const buildSearchApiUrl = (query: string) =>
  `${SEARCH_API_URL}?q=${encodeURIComponent(query)}`;

export default function usePostData() {
  const search = useSearchParams();
  const searchQuery = search?.get('q') || '';

  const { data, error, isValidating } = useSWR<Post[]>(
    buildSearchApiUrl(searchQuery),
    fetchPosts,
  );

  return {
    posts: data || null,
    error,
    isLoading: isValidating,
  };
}
