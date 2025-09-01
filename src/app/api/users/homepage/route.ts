import { NextRequest, NextResponse } from "next/server";
import { sqlconnectdb } from "@/dbConfig/sqlconnect";

export async function GET(request: NextRequest) {
  try {
    const db = await sqlconnectdb();
    const userid = request.cookies.get("userid")?.value;
    const [productsrows]: any = await db.query(
      "SELECT COUNT(*) AS total_product FROM users_products WHERE userid =?",
      [userid]
    );
    const [salesrows]: any = await db.query(
      "SELECT SUM(productprice) AS total_sales FROM total_sales WHERE userid=? AND sale_date = CURDATE()",
      [userid]
    );
    const [totalSaleTillNowData]: any = await db.query(
      "SELECT SUM(productprice) AS total_saled FROM total_sales WHERE userid=?",
      [userid]
    );
    const [monthlysalesrow]: any = await db.query(
      "SELECT COALESCE(SUM(productprice),0) AS monthly_sales FROM total_sales WHERE userid=? AND MONTH(sale_date) = MONTH(CURDATE()) AND YEAR(sale_date)=YEAR(CURDATE())",
      [userid]
    );
    // const [totalProductsSales] = await db.query(
    //   "SELECT productid,productname,SUM(quantity) AS total_quantity FROM users_products WHERE userid = ? GROUP BY productid, productname ORDER BY productid;"
    // );
    const totalSaleTillNow = Number(totalSaleTillNowData[0]?.total_saled) || 0;
    const totalproducts = Number(productsrows[0]?.total_product) || 0;
    const totalsales = Number(salesrows[0]?.total_sales) || 0;
    const monthlysales = Number(monthlysalesrow[0]?.monthly_sales) || 0;
    console.log(monthlysalesrow);
    return NextResponse.json(
      {
        message: "fetched data sucessfully",
        totalproducts: totalproducts,
        totalsales: totalsales,
        totalSaleTillNow: totalSaleTillNow,
        monthlysales: monthlysales,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
