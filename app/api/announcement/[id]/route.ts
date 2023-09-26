import prisma from "@/app/db";
import { NextResponse } from "next/server";
import { main } from "../route";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = Number(req.url.split("/announcement/")[1]);
    await main();
    const post = await prisma.post.findFirst({where:{ id }});

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = Number(req.url.split("/announcement/")[1]);
    const { title, content } = await req.json();

    await main();
    const post = await prisma.post.update({
      data: { title, content },
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = Number(req.url.split("/announcement/")[1]);
    await main();
    const post = await prisma.post.delete({ where: { id }});
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  } 
};