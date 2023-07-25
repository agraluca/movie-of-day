import pg from "pg";

const { Client } = pg;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "3336",
  database: "moviesdb",
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

export async function query(query, values) {
  const { rows } = await client.query(query, values);
  return rows;
}
