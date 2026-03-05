/**
 * 블로그 포스트 타입 및 스키마
 * React Hook Form + Zod를 사용한 타입-세이프한 폼 검증
 */
import { z } from 'zod';

// Zod 스키마 정의
export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(200, '제목은 200자 이하여야 합니다'),
  slug: z
    .string()
    .min(1, 'Slug을 입력해주세요')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug은 영문, 숫자, 하이픈만 사용 가능합니다'),
  content: z.string().min(1, '본문을 입력해주세요'),
  excerpt: z.string().optional(),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  tags: z
    .array(z.string())
    .min(1, '최소 1개의 태그를 선택해주세요')
    .max(10, '태그는 최대 10개까지 가능합니다'),
  published: z.boolean().default(false),
  publishedAt: z.date().optional(),
});

// 타입 추출
export type PostInput = z.infer<typeof postSchema>;

// 데이터베이스 모델
export interface Post extends PostInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 로그인 스키마
export const authSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

// 로그인 폼 데이터 타입
export type AuthFormData = z.infer<typeof authSchema>;
