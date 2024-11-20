import prisma from '@/app/lib/prisma';

// 전체 게시글 조회
export const getAllPosts = async () => {
  return await prisma.post.findMany();
};

// 게시글 생성
export const createPost = async (title: string, content: string) => {
  return await prisma.post.create({
    data: { title, content },
  });
};

// ID를 통한 게시글 조회
export const getPostById = async (id: number) => {
  return await prisma.post.findFirst({
    where: { id },
  });
};

// 게시글 삭제
export const deletePost = async (id: number) => {
  return await prisma.post.delete({
    where: { id },
  });
};
