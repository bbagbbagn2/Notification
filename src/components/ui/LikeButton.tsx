'use client';

import { Heart } from 'lucide-react';
import { useLikesCount, useIsPostLikedByUser, useToggleLike } from '@/lib/hooks';

interface LikeButtonProps {
  postId: string;
  userId?: string;
}

export function LikeButton({ postId, userId }: LikeButtonProps) {
  const { data: likesCount = 0 } = useLikesCount(postId);
  const { data: isLiked = false } = useIsPostLikedByUser(postId, userId);
  const { mutate: toggleLike, isPending } = useToggleLike();

  const handleLike = () => {
    if (!userId) {
      alert('로그인 후 좋아요를 할 수 있습니다.');
      return;
    }

    toggleLike({ postId, userId });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${
          isLiked
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `}
    >
      <Heart
        size={18}
        className={isLiked ? 'fill-current' : ''}
      />
      <span>{likesCount}</span>
    </button>
  );
}

export default LikeButton;
