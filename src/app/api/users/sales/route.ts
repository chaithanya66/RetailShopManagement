import { NextRequest, NextResponse } from "next/server";
import { sqlconnectdb } from "@/dbConfig/sqlconnect";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { productid, productname, price, quantity, description } = reqBody;
  const userid = request.cookies.get("userid")?.value;
  try {
    let db = await sqlconnectdb();
    let [initialquantity] = await db.query(
      "SELECT quantity FROM users_products WHERE productid=?",
      [productid]
    );
    let iniquantity = initialquantity[0]?.quantity;
    console.log("initial quantity of product", iniquantity);

    let [initialupdateproduct] = await db.query(
      "UPDATE users_products SET productname=?,price=?,quantity=?,description=? WHERE productid=?",
      [productname, price, quantity, description, productid]
    );

    // let [productprice] = await db.query(
    //   "SELECT price FROM users_products WHERE productid=?",
    //   [productid]
    // );

    if (iniquantity > quantity) {
      try {
        let date = new Date().toISOString().slice(0, 10);
        console.log("sale date: ", date);
        let saledquantity = iniquantity - quantity;
        let productprice = (iniquantity - quantity) * price;
        console.log("sales: ", productprice);

        let db = await sqlconnectdb();

        let insertsales = await db.query(
          "INSERT INTO total_sales (userid,productid,productprice,saledquantity,sale_date) VALUES (?,?,?,?,?)",
          [userid, productid, productprice, saledquantity, date]
        );
        let [updateproduct] = await db.query(
          "UPDATE users_products SET productname=?,price=?,quantity=?,description=? WHERE productid=?",
          [productname, price, quantity, description, productid]
        );
        return NextResponse.json(
          {
            message: "saled sucessfully",
            updated_product: updateproduct,
            inserted_sale: insertsales,
          },
          { status: 200 }
        );
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      return NextResponse.json(
        {
          message: "data changed",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "error whie creating a sale", error: error.message },
      { status: 500 }
    );
  }
}
