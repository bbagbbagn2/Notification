import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { Post } from '@/types';
import { PostList } from '@/components/post/PostList';
import { CategoryFilter } from '@/components/ui/CategoryFilter';

interface HomePageProps {
  searchParams: { category?: string };
}

async function getPosts(category?: string): Promise<Post[]> {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query.limit(6);

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

async function getCategories(): Promise<string[]> {
  const result: {
    data: { category: string }[] | null;
    error: unknown;
  } = await supabase.from('posts').select('category').eq('published', true);

  //오류거나 데이터가 없으면 빈 값 호출
  if (result.error || !result.data) return [];

  const categories = Array.from(new Set(result.data.map((p) => p.category).filter(Boolean)));
  return categories as string[];
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const categoryParam = resolvedSearchParams?.category;
  const category = typeof categoryParam === 'string' ? categoryParam : undefined;

  const posts = await getPosts(category);
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl leading-tight font-bold text-black md:text-6xl">
            개발을 기록하다
          </h1>
          <p className="text-text-light mb-4 text-lg md:text-xl">
            TIL, 회고, 학습 내용을 정리하고 공유합니다
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-2 px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter categories={categories} />
        </div>

        {/* Posts Grid */}
        <PostList
          posts={posts}
          emptyMessage={
            categoryParam
              ? `"${categoryParam}" 카테고리에 글이 없습니다.`
              : '아직 작성된 글이 없습니다.'
          }
        />

        {/* View All Button */}
        {posts.length >= 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/posts"
              className="bg-primary hover:bg-primary-hover inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg"
            >
              전체 글 보기
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>

      {/* Featured Section */}
      {posts.length > 0 && (
        <section className="bg-color-gray-50 mt-20 border-t border-gray-200 px-4 py-16">
          <div className="mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-black">최근 작성한 글</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-(--color-text)">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-(--color-text-light)">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
