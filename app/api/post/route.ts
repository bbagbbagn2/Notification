import { NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/app/_services/postService';

// 게시물 전체 조회
export const GET = async () => {
  try {
    const posts = await getAllPosts();

    if (posts.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Success', posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};

// 게시물 생성
export const POST = async (req: Request) => {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 },
      );
    }

    const newPost = await createPost(title, content);

    return NextResponse.json(
      { message: 'Post created successfully', post: newPost },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};
