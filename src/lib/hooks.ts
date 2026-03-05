/**
 * React Query (TanStack Query) 커스텀 훅
 * 최신 데이터 페칭 및 캐싱 패턴
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post, ApiResponse } from '@/lib/schemas';
import { getPostViews } from '@/lib/engagement';
import { useNotificationStore } from '@/lib/store';

const API_BASE_URL = '/api';

// ====== Query Keys (TanStack Query 권장사항) ======
export const postQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postQueryKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) =>
    [...postQueryKeys.lists(), filters] as const,
  details: () => [...postQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...postQueryKeys.details(), id] as const,
};

// ====== API Functions ======

/**
 * 글 목록 조회
 */
async function fetchPosts(
  page: number = 1,
  limit: number = 10,
  category?: string,
): Promise<Post[]> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category) {
    params.append('category', category);
  }

  const response = await fetch(`${API_BASE_URL}/posts?${params}`);

  if (!response.ok) {
    throw new Error('글 목록 조회 실패');
  }

  const data: ApiResponse<Post[]> = await response.json();

  if (!data.success) {
    throw new Error(data.error || '글 목록 조회 실패');
  }

  return data.data || [];
}

/**
 * 단일 글 조회
 */
async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error('글 조회 실패');
  }

  const data: ApiResponse<Post> = await response.json();

  if (!data.success) {
    throw new Error(data.error || '글 조회 실패');
  }

  return data.data!;
}

/**
 * 글 생성
 */
async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('글 작성 실패');
  }

  const data: ApiResponse<Post> = await response.json();

  if (!data.success) {
    throw new Error(data.error || '글 작성 실패');
  }

  return data.data!;
}

/**
 * 글 수정
 */
async function updatePost(
  id: string,
  post: Partial<Post>,
): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('글 수정 실패');
  }

  const data: ApiResponse<Post> = await response.json();

  if (!data.success) {
    throw new Error(data.error || '글 수정 실패');
  }

  return data.data!;
}

/**
 * 글 삭제
 */
async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('글 삭제 실패');
  }
}

// ====== Custom Hooks ======

/**
 * 글 목록 조회 훅
 * - 자동 캐싱
 * - 백그라운드 리페칭
 * - 스테일 타임 관리
 */
export function usePosts(page: number = 1, limit: number = 10, category?: string) {
  return useQuery({
    queryKey: postQueryKeys.list({ page, limit, category }),
    queryFn: () => fetchPosts(page, limit, category),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분 (이전의 cacheTime)
  });
}

/**
 * 단일 글 조회 훅
 */
export function usePost(id: string) {
  return useQuery({
    queryKey: postQueryKeys.detail(id),
    queryFn: () => fetchPost(id),
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 1 * 60 * 60 * 1000, // 1시간
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
}

/**
 * 글 생성 훅
 */
export function useCreatePost() {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 글 목록 캐시 무효화하여 최신 데이터 자동 로드
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.lists(),
      });

      addNotification({
        type: 'success',
        message: '글이 작성되었습니다',
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message,
        duration: 5000,
      });
    },
  });
}

/**
 * 글 수정 훅
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      updatePost(id, data),
    onSuccess: (data) => {
      // 해당 글 및 목록 캐시 업데이트
      queryClient.setQueryData(postQueryKeys.detail(data.id), data);
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.lists(),
      });

      addNotification({
        type: 'success',
        message: '글이 수정되었습니다',
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message,
        duration: 5000,
      });
    },
  });
}

/**
 * 글 삭제 훅
 */
export function useDeletePost() {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // 글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.lists(),
      });

      addNotification({
        type: 'success',
        message: '글이 삭제되었습니다',
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: error.message,
        duration: 5000,
      });
    },
  });
}

// ====== Engagement (조회수 & 좋아요) ======

import {
  incrementViews,
  getLikesCount,
  toggleLike,
  isPostLikedByUser,
  getUserLikes,
} from '@/lib/engagement';

export const engagementQueryKeys = {
  all: ['engagement'] as const,
  likes: () => [...engagementQueryKeys.all, 'likes'] as const,
  likesCount: (postId: string) =>
    [...engagementQueryKeys.likes(), postId] as const,
  isLiked: (postId: string, userId: string) =>
    [...engagementQueryKeys.all, 'isLiked', postId, userId] as const,
  userLikes: (userId: string) =>
    [...engagementQueryKeys.all, 'userLikes', userId] as const,
};

/**
 * 글 조회수 조회
 */
export function usePostViews(postId: string) {
  return useQuery({
    queryKey: [...engagementQueryKeys.all, 'views', postId],
    queryFn: () => getPostViews(postId),
    staleTime: 30 * 1000,
    enabled: !!postId,
  });
}

/**
 * 글 조회수 증가
 */
export function useIncrementViews(postId: string) {
  return useMutation({
    mutationFn: () => incrementViews(postId),
  });
}

/**
 * 글의 좋아요 개수 조회
 */
export function useLikesCount(postId: string) {
  return useQuery({
    queryKey: engagementQueryKeys.likesCount(postId),
    queryFn: () => getLikesCount(postId),
    staleTime: 10 * 1000, // 10초
  });
}

/**
 * 사용자가 글에 좋아요를 눌렀는지 확인
 */
export function useIsPostLikedByUser(postId: string, userId?: string) {
  return useQuery({
    queryKey: engagementQueryKeys.isLiked(postId, userId || ''),
    queryFn: () => {
      if (!userId) return false;
      return isPostLikedByUser(postId, userId);
    },
    enabled: !!userId,
    staleTime: 30 * 1000, // 30초
  });
}

/**
 * 좋아요 토글
 */
export function useToggleLike() {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      toggleLike(postId, userId),
    onSuccess: (isLiked, { postId }) => {
      // 좋아요 개수 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: engagementQueryKeys.likesCount(postId),
      });

      addNotification({
        type: 'success',
        message: isLiked ? '좋아요했습니다' : '좋아요가 취소되었습니다',
        duration: 2000,
      });
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        message: '좋아요 처리 중 오류가 발생했습니다',
        duration: 3000,
      });
    },
  });
}

/**
 * 사용자의 모든 좋아요 조회
 */
export function useUserLikes(userId?: string) {
  return useQuery({
    queryKey: engagementQueryKeys.userLikes(userId || ''),
    queryFn: () => {
      if (!userId) return [];
      return getUserLikes(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
  });
}
