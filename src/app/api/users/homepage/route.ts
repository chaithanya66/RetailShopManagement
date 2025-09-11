import { NextRequest, NextResponse } from "next/server";
import { sqlconnectdb } from "@/dbConfig/sqlconnect";

export async function GET(request: NextRequest) {
  try {
    const db = await sqlconnectdb();
    const userid = request.cookies.get("userid")?.value;
    if (!userid) {
      return NextResponse.json(
        { error: "User ID not found in cookies" },
        { status: 400 }
      );
    }
    const productsrows = await db.query(
      "SELECT COUNT(*) AS total_product FROM users_products WHERE userid =$1",
      [userid]
    );
    const salesrows = await db.query(
      "SELECT COALESCE(SUM(productprice),0) AS total_sales FROM total_sales WHERE userid=$1 AND sale_date = CURRENT_DATE",
      [userid]
    );
    const totalSaleTillNowData = await db.query(
      "SELECT COALESCE(SUM(productprice),0) AS total_saled FROM total_sales WHERE userid=$1",
      [userid]
    );
    const monthlysalesrow = await db.query(
      `SELECT COALESCE(SUM(productprice),0) AS monthly_sales 
       FROM total_sales 
       WHERE userid=$1 
         AND EXTRACT(MONTH FROM sale_date) = EXTRACT(MONTH FROM CURRENT_DATE) 
         AND EXTRACT(YEAR FROM sale_date) = EXTRACT(YEAR FROM CURRENT_DATE)`,
      [userid]
    );
    // const [totalProductsSales] = await db.query(
    //   "SELECT productid,productname,SUM(quantity) AS total_quantity FROM users_products WHERE userid = ? GROUP BY productid, productname ORDER BY productid;"
    // );
    const totalSaleTillNow =
      Number(totalSaleTillNowData.rows[0]?.total_saled) || 0;
    const totalproducts = Number(productsrows.rows[0]?.total_product) || 0;
    const totalsales = Number(salesrows.rows[0]?.total_sales) || 0;
    const monthlysales = Number(monthlysalesrow.rows[0]?.monthly_sales) || 0;
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
