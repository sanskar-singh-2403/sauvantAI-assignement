import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getUser() {
  const session = await getServerSession();
  return session;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getUser();

  // console.log(session);
  // console.log(body);

  if (session?.user) {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      include: {
        loans: true,
      },
    });
    const empStatus = body.job === "Employed";
    const amount = parseInt(body.amount);
    const userId = parseInt(user?.id);

    // console.log(user);
    const newLoan = await prisma.loan.create({
      data: {
        userId: userId,
        fullName: body.name,
        amount: amount,
        tenure: body.time,
        reason: body.reason,
        empStatus: empStatus,
        empAddr: body.addr,
        status: "Pending",
        officer: -1, // Meaning no verifier verified the loan
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        loans: { connect: { id: newLoan?.id } },
      },
      include: { loans: true },
    });

    // console.log(updatedUser);
  }

  return NextResponse.json({
    message: "Data fetched successfully",
  });
}
