import { NextResponse } from 'next/server';
import { getPostById, deletePost } from '@/app/_services/postService';

// 게시글 조회
export const GET = async (req: Request) => {
  try {
    const id = Number(req.url.split('/post/')[1]);
    const post = await getPostById(id);

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Success', post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
};

// 게시글 삭제
export const DELETE = async (req: Request) => {
  try {
    const id = Number(req.url.split('/post/')[1]);
    const post = await deletePost(id);

    return NextResponse.json({ message: 'Success', post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};
