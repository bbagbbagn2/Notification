// types/index.ts

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id?: string;
  views?: number; // 조회수 (Supabase 스키마 설정 후 필수)
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface PostWithEngagement extends Post {
  likes_count: number;
  is_liked_by_user?: boolean; // 현재 사용자가 좋아요 눌렀는지
}

export interface Draft {
  id: string;
  post_id?: string;
  content: string;
  created_at: string;
  author_id?: string;
}

export interface PostFormData {
  title: string;
  content: string;
  category?: string;
  tags: string[];
  published: boolean;
}

export interface SearchParams {
  query?: string;
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
