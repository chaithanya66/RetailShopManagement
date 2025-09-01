import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userid = request.cookies.get("userid")?.value;
    return NextResponse.json(userid);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
