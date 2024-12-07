import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// 제목 검색 기능
export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get('q') || '';

  try {
    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    });

    if (posts.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Success', posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};