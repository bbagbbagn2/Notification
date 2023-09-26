import { NextResponse } from "next/server";
import prisma from "../../db";

export async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("Database Connection Unsuccessfull");
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany();

        return NextResponse.json({ message: "successful", posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500});
    }
};

export const POST = async (req: Request, res: NextResponse) => {
    try {
        const {title, content} = await req.json();
        await main();

        const post = await prisma.post.create({ data: { title, content } });

        return NextResponse.json({ message: "Success", post}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
