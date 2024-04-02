import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetchPosts } from "@/app/_services/post";
import { Post } from "@/app/_types/Post";

const SEARCH_API_URL = "/api/search?q=";

export default function usePostData() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const endcodedSearchQuery = encodeURI(searchQuery || "");

  const { data, error, isValidating } = useSWR<Post[]>(
    `${SEARCH_API_URL}${endcodedSearchQuery}`,
    fetchPosts
  );

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
