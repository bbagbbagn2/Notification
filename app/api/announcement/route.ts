import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json({ message: 'successful', posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, content } = await req.json();

    const post = await prisma.post.create({ data: { title, content } });

    return NextResponse.json({ message: 'Success', post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};
