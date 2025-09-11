import { NextRequest, NextResponse } from "next/server";
import { sqlconnectdb } from "@/dbConfig/sqlconnect";

export async function GET(request: NextRequest) {
  let db = await sqlconnectdb();
  try {
    const userid = request.cookies.get("userid")?.value;

    const rows = await db.query(
      "SELECT * FROM users_products WHERE userid=$1",
      [userid]
    );

    return NextResponse.json(
      {
        message: "data fetched successfully",
        totalproducts: rows.rows,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
