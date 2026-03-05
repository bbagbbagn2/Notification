// app/posts/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Tag, Edit, ArrowLeft, Clock } from 'lucide-react';
import { PostContent } from '@/components/post/PostContent';
import { PostEngagement } from '@/components/post/PostEngagement';
import { supabase } from '@/lib/supabase';
import { formatDate, calculateReadingTime, getRelativeTime } from '@/lib/utils';
import { Post } from '@/types';

// ISR 설정: 1시간마다 재검증
export const revalidate = 3600;

interface PostDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  const decodedSlug = decodeURIComponent(slug);

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', decodedSlug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}

// 인기 글 50개를 미리 정적 생성
export async function generateStaticParams() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error || !posts) {
    console.error('Error generating static params:', error);
    return [];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: '글을 찾을 수 없습니다',
    };
  }

  return {
    title: `${post.title} | BlockSmith`,
    description: post.excerpt || post.content.slice(0, 150),
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 150),
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      tags: post.tags,
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const isUpdated = post.updated_at !== post.created_at;

  return (
    <div className="bg-background min-h-screen">
      <article className="mx-auto max-w-4xl px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="text-text-light hover:text-primary mb-8 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>목록으로</span>
        </Link>

        {/* Header */}
        <header className="mb-8 border-b-2 border-gray-200 pb-8">
          {/* Category */}
          {post.category && <span className="badge mb-4">{post.category}</span>}

          {/* Title */}
          <h1 className="text-text mb-6 text-3xl leading-tight font-bold md:text-5xl">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            </div>

            <span className="text-gray-300">•</span>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readingTime}분 읽기</span>
            </div>

            {isUpdated && (
              <>
                <span className="hidden text-gray-300 md:block">•</span>
                <span className="text-gray-400">{getRelativeTime(post.updated_at)} 수정됨</span>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-text-light inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  <Tag size={14} />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="mb-12 rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <PostContent content={post.content} />
        </div>

        {/* Engagement Section */}
        <PostEngagement post={post} />

        {/* Actions */}
        <div className="flex items-center justify-end border-t-2 border-gray-200 pt-8">
          <Link href={`/edit/${post.id}`} className="btn-secondary inline-flex items-center gap-2">
            <Edit size={18} />
            수정
          </Link>
        </div>
      </article>
    </div>
  );
}
