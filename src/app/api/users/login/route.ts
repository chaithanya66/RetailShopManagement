import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sqlconnectdb } from "@/dbConfig/sqlconnect";

// connectdb();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  console.log(reqBody);
  const db = await sqlconnectdb();
  try {
    const result = await db.query("SELECT * FROM registration WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "User doesn't exists" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, result.rows[0].password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 401 }
      );
    }
    const userid = result.rows[0].userid;

    const response = NextResponse.json(
      { message: "Login successfull", userid: userid },
      { status: 200 }
    );

    response.cookies.set("userid", userid, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
