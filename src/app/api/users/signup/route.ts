import { sqlconnectdb } from "@/dbConfig/sqlconnect";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
777;
function getRandomCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%&*";
  let code = "";
  const bytes = crypto.randomBytes(length);
  let i;
  for (i = 0; i < length; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

const authhcode = "2006-09-09-authers-id";
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { username, email, password } = reqBody;
  const linktocustomer = getRandomCode(5 + Math.floor(Math.random() * 2));

  console.log(reqBody);
  try {
    const db = await sqlconnectdb();
    const [rows]: any = await db.query(
      "SELECT * FROM registration WHERE email=?",
      [email]
    );
    if (rows.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userid = jwt.sign({ email, username }, authhcode);
    // const userid = uuidv4;
    console.log("Generated token:", userid);

    const [result]: any = await db.query(
      "INSERT INTO registration (username, email,userid, password,linktocustomer) VALUES (?, ?, ?,?, ?)",
      [username, email, userid, hashedPassword, linktocustomer]
    );

    return NextResponse.json(
      { message: "User created successfully", userid: userid, result },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
