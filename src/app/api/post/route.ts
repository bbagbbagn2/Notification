import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/app/lib/prisma';

// 게시물 전체 조회 (GET)
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();

    if (posts.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Success', posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};

// 게시물 생성 (POST)
export const POST = async (req: NextRequest) => {
  try {
    const { title, body } = await req.json();

    if (!title || !body) {
      return NextResponse.json(
        { message: 'Title and body are required' },
        { status: 400 },
      );
    }

    const newPost = await prisma.post.create({
      data: { title: title, body: body },
    });

    return NextResponse.json(
      { message: 'Post created successfully', newPost },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};
