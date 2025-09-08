import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/app/lib/prisma';

// 게시글 조회 (GET)
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const requestedId = parseInt(params.id);

    const post = await prisma.post.findUnique({
      where: { id: requestedId },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Success', post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
};

// 게시글 수정 (PUT)
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { title, content } = await req.json();

    const requestedId = parseInt(params.id);

    const post = await prisma.post.findUnique({
      where: { id: requestedId },
    });

    if (!post) {
      return NextResponse.json({ error: 'POST NOT FOUND' }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: requestedId },
      data: { title: title, content: content },
    });

    return NextResponse.json(
      { message: 'Success', updatedPost },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};

// 게시글 삭제 (DELETE)
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const requestedId = parseInt(params.id);

    const post = await prisma.post.delete({
      where: { id: requestedId },
    });

    return NextResponse.json({ message: 'Success', post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};
