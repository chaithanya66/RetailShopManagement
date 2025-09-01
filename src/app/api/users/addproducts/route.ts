import { NextRequest, NextResponse } from "next/server";
import { sqlconnectdb } from "@/dbConfig/sqlconnect";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { productName, price, quantity, description } = reqBody;
  try {
    let db = await sqlconnectdb();
    const secretCode = "productid19043";
    const userid = request.cookies.get("userid")?.value;
    const productid = jwt.sign({ productName, userid }, secretCode);
    console.log(productid);
    console.log(userid);
    let [row] = await db.query(
      "INSERT INTO users_products (userid,productid,productname,price,quantity,description) VALUES(?,?,?,?,?,?)",
      [userid, productid, productName, price, quantity, description]
    );
    console.log("Sql: ", row);
    let totalproducts = await db.query(
      "SELECT COUNT(*) AS total_product FROM users_products WHERE userid =?",
      [userid]
    );

    return NextResponse.json(
      {
        message: "products created",
        total_products: totalproducts,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
