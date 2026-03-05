import Link from 'next/link';
import { Calendar, Tag, Clock, Eye, Heart } from 'lucide-react';
import { Post } from '@/types';
import { formatDate, calculateReadingTime, getFirstSentence } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content);
  const previewExcerpt = post.excerpt || post.content;

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="card animate-fade-in flex h-full cursor-pointer flex-col items-start justify-between gap-3 p-6 transition-all duration-200 hover:border-(--color-primary)">
        {post.category && <span className="badge">{post.category}</span>}
        <h2 className="line-clamp-2 text-xl font-bold text-(--color-text) transition-colors hover:text-(--color-primary)">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="leading-relaxed text-(--color-text-light)">
            {getFirstSentence(previewExcerpt)}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <time dateTime={post.created_at}>{formatDate(post.created_at, 'short')}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{readingTime}분</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{post.views} views</span>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                <Tag size={12} />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
            )}
          </div>
        )}
      </article>
    </Link>
  );
}
