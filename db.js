import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
});

export default pool.promise();
