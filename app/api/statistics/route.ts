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
    const activeUsers = await prisma.user.count();
    const borrowers = await prisma.user.count({
      where: {
        loans: {
          some: {},
        },
      },
    });

    const cashDisbursed = await prisma.loan.aggregate({
      _sum: {
        amount: true,
      },
    });

    const paidLoansAmount = await prisma.loan.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        paid: true,
      },
    });

    const paidLoansCount = await prisma.loan.count({ where: { paid: true } });

    const otherAccounts = activeUsers - borrowers;

    const loansCount = await prisma.loan.count();

    return NextResponse.json({
      activeUsers,
      borrowers,
      cashDisbursed,
      paidLoansAmount,
      paidLoansCount,
      otherAccounts,
      loansCount,
    });
  }
}
