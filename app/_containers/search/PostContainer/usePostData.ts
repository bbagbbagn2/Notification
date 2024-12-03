import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { fetchPosts } from '@/app/_services/post';
import { Post } from '@/app/_types/Post';

const SEARCH_API_URL = '/api/search';

const buildSearchApiUrl = (query: string) => `${SEARCH_API_URL}?q=${encodeURIComponent(query)}`;


export default function usePostData() {
  const search = useSearchParams();
  const searchQuery = search?.get('q') || '';

  const { data, error, isValidating } = useSWR<Post[]>(
    buildSearchApiUrl(searchQuery),
    fetchPosts,
  );

  return {
    posts: data,
    error,
    isLoading: isValidating,
  };
}