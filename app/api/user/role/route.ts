import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function getUser() {
  const session = await getServerSession();
  return session;
}
export async function GET() {
  const session = await getUser();

  if (session?.user) {
    const User = await prisma.user.findFirst({
      where: {
        email: session.user?.email,
      },
    });

    return NextResponse.json({
      role: User?.role,
    });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}
