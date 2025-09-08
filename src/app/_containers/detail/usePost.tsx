import { useEffect, useState } from 'react';
import { getPostById } from '@/src/app/_services/post';
import { Post } from '@prisma/client';

type UsePostState = {
  post: Post | null;
  loading: boolean;
  error: string | null;
};

export function usePost(id: number) {
  const [state, setState] = useState<UsePostState>({
    post: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({
        post: null,
        loading: false,
        error: '잘못된 게시글 ID입니다.',
      });
      return;
    }

    const fetchPost = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await getPostById(id);
        setState({ post: data, loading: false, error: null });
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setState({
          post: null,
          loading: false,
          error: 'Failed to fetch post. Please try again later.',
        });
      }
    };

    fetchPost();
  }, [id]);

  return state;
}
