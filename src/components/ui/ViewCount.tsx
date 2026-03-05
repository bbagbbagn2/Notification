'use client';

import { Eye } from 'lucide-react';

interface ViewCountProps {
  views: number;
}

export function ViewCount({ views }: ViewCountProps) {
  const viewCount = views ?? 0;
  return (
    <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
      <Eye size={16} />
      <span>{viewCount.toLocaleString()} views</span>
    </div>
  );
}

export default ViewCount;
