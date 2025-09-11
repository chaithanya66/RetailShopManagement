import { Pool } from "pg";

let pool: Pool;

const createTableQuery = `
CREATE TABLE IF NOT EXISTS registration (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  email VARCHAR(300) NOT NULL,
  userid VARCHAR(1020) NOT NULL,
  password VARCHAR(300) NOT NULL,
  linktocustomer VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_products (
  id SERIAL PRIMARY KEY,
  userid VARCHAR(1024) NOT NULL,
  productid VARCHAR(1024) NOT NULL,
  productname VARCHAR(200) NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS total_sales (
  id SERIAL PRIMARY KEY,
  userid VARCHAR(1024) NOT NULL,
  productid VARCHAR(1024) NOT NULL,
  productprice INT NOT NULL,
  saledquantity INT NOT NULL,
  sale_date DATE NOT NULL,
  saled_at_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export async function sqlconnectdb() {
  if (!pool) {
    pool = new Pool({
      host: "dpg-d2imid9r0fns738m5tog-a.oregon-postgres.render.com",
      user: "root",
      password: "zIETXi9yHOpWZ1sbGrB1LcdMRraot0bb",
      database: "school_db_assign",
      port: 5432,
      ssl: { rejectUnauthorized: false },
    });

    const client = await pool.connect();
    await client.query(createTableQuery);
    client.release();

    console.log("Tables created successfully in PostgreSQL");
  }
  return pool;
}
