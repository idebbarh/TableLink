import mysql from "mysql2";
import { promisify } from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "debbarh",
  password: "debbarh",
  port: 3306,
  database: "table_link",
});

const query = promisify(connection.query).bind(connection);

const connectToDB = async () => {
  await query({ sql: "select 1" });
};

const createTables = async () => {};

const closeDBConnection = () => {
  connection.end();
};

export default query;

export { connectToDB, createTables, closeDBConnection };
