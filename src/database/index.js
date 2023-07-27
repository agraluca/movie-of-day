import pg from "pg";

const { Client } = pg;

import env from "dotenv";

env.config();

const isProd = process.env.NODE_ENV === "production";

const client = isProd
  ? new Client({
      connectionString: `${process.env.DB_CONNECTION_STRING}`,
    })
  : new Client({
      host: `${process.env.DB_HOST}`,
      port: `${process.env.DB_PORT}`,
      database: `${process.env.DB_NAME}`,
      user: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
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
