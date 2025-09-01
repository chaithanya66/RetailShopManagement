import mysql from "mysql2/promise";

let pool: any;

// export async function sqlconnectdb() {
//   if (!pool) {
//     try {
//       pool = mysql.createPool({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "shop_users",
//       });
//       console.log("sql connected successfully");
//     } catch (error) {
//       console.log("DB connection error", error);
//       throw error;
//     }
//     return pool;
//   }
// }

export async function sqlconnectdb() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "shop_users",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
