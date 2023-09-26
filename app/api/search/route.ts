import prisma from "../../db";
import { type NextRequest, NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("Database Connection Unsuccessful");
  }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');

    await main();

    if (typeof query !== 'string') {
      throw new Error("Invalid");
    }

    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: query,
        }
      }
    }
    );

    console.log(query);

    return NextResponse.json({ message: "successful", query, posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}; 