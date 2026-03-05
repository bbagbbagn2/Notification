'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get('category');

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/"
        className={cn(
          'rounded-full px-4 py-2 font-medium transition-all duration-200',
          !currentCategory
            ? 'bg-(--color-primary) text-white shadow-md'
            : 'border border-gray-200 bg-white text-(--color-text-light) hover:bg-gray-50'
        )}
      >
        전체
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/?category=${category}`}
          className={cn(
            'rounded-full px-4 py-2 font-medium transition-all duration-200',
            currentCategory === category
              ? 'bg-(--color-primary) text-white shadow-md'
              : 'border border-gray-200 bg-white text-(--color-text-light) hover:bg-gray-50'
          )}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
