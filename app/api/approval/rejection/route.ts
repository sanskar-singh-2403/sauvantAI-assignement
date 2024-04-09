import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = new URLSearchParams(url.search);
  const role = searchParams.get("role") || "User";
  const id = parseInt(searchParams.get("id")) || -1;

  console.log('roel id d d',role, id);
  


  if (role == "Verifier") {
    const updatedLoan = await prisma.loan.update({
      where: {
        id: id,
      },

      data: {
        status: "Rejected",
      },
    });

    return NextResponse.json({
      message: "DONE it is",
    });
  } else {
    return NextResponse.json({
      error: "User not verified",
      status: 403,
    });
  }
}
