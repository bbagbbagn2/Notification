'use client';

/**
 * 최신 폼 관리 패턴
 * React Hook Form + Zod를 사용한 타입-세이프한 폼
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type PostInput } from '@/lib/schemas';
import { useNotificationStore } from '@/lib/store';

interface PostFormProps {
  initialData?: PostInput;
  onSubmit: (data: PostInput) => Promise<void>;
  isLoading?: boolean;
}

/**
 * 글 작성/수정 폼 컴포넌트
 * - React Hook Form으로 효율적인 폼 관리
 * - Zod로 런타임 검증
 * - 실시간 에러 표시
 */
export function PostForm({ initialData, onSubmit, isLoading = false }: PostFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
    mode: 'onBlur', // 최적화: blur 이벤트 때만 검증
  });

  const addNotification = useNotificationStore((state) => state.addNotification);

  const onSubmitHandler = async (data: PostInput) => {
    try {
      await onSubmit(data);
      addNotification({
        type: 'success',
        message: '저장되었습니다',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: error instanceof Error ? error.message : '오류가 발생했습니다',
        duration: 5000,
      });
    }
  };

  const isLoaderActive = isSubmitting || isLoading;
  const title = watch('title');
  const content = watch('content');

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      {/* 제목 필드 */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          제목 *
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          placeholder="글의 제목을 입력하세요"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          disabled={isLoaderActive}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Slug 필드 */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          URL Slug *
        </label>
        <input
          {...register('slug')}
          type="text"
          id="slug"
          placeholder="example-slug"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          disabled={isLoaderActive}
        />
        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
      </div>

      {/* 카테고리 필드 */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          카테고리 *
        </label>
        <select
          {...register('category')}
          id="category"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          disabled={isLoaderActive}
        >
          <option value="">카테고리 선택</option>
          <option value="react">React</option>
          <option value="typescript">TypeScript</option>
          <option value="webdev">웹 개발</option>
          <option value="other">기타</option>
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      {/* 본문 필드 */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          본문 *
        </label>
        <textarea
          {...register('content')}
          id="content"
          rows={12}
          placeholder="마크다운 형식으로 작성할 수 있습니다"
          className="mt-1 block w-full resize-none rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900 placeholder-gray-400 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          disabled={isLoaderActive}
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
        <p className="mt-1 text-xs text-gray-500">{content?.length || 0} / 무제한</p>
      </div>

      {/* 공개 여부 */}
      <div className="flex items-center gap-2">
        <input
          {...register('published')}
          type="checkbox"
          id="published"
          className="h-four w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          disabled={isLoaderActive}
        />
        <label htmlFor="published" className="text-sm text-gray-700">
          공개 게시
        </label>
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoaderActive}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoaderActive ? '저장 중...' : '저장'}
        </button>
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          취소
        </button>
      </div>
    </form>
  );
}

export default PostForm;
