import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getUser() {
  const session = await getServerSession();
  return session;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
  const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1", 10);

  const session = await getUser();

  if (session?.user) {
    const user = await prisma.user.findFirst({
      where: { email: session?.user?.email },
    });

    const loans = await prisma.loan.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ loans });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Add other handler functions for different HTTP methods if needed
