'use client';

import { useEffect, useRef } from 'react';
import { useIncrementViews, usePostViews } from '@/lib/hooks';
import { useAuthStore } from '@/lib/store';
import { Post } from '@/types';
import { ViewCount } from '@/components/ui/ViewCount';

interface PostEngagementProps {
  post: Post;
}

export function PostEngagement({ post }: PostEngagementProps) {
  const { mutate: incrementViews } = useIncrementViews(post.id);
  const { data: views = post.views ?? 0 } = usePostViews(post.id);
  const user = useAuthStore((state) => state.user);
  const hasIncrementedRef = useRef<string | null>(null);

  useEffect(() => {
    // 같은 post에 대해 중복 호출 방지
    if (hasIncrementedRef.current === post.id) return;
    hasIncrementedRef.current = post.id;

    incrementViews();
  }, [post.id]);

  return (
    <div className="my-8 flex items-center py-6">
      <ViewCount views={views} />
    </div>
  );
}

export default PostEngagement;
