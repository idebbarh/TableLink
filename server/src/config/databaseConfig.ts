import mysql from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();
//config
const _host =
  process.env.DB_HOST !== undefined ? process.env.DB_HOST : "localhost";
const _user = process.env.DB_USER !== undefined ? process.env.DB_USER : "root";
const _password =
  process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "root";
const _port =
  process.env.DB_PORT !== undefined ? parseInt(process.env.DB_PORT) : 3306;
const _database =
  process.env.DB_NAME !== undefined ? process.env.DB_NAME : "test";

const connection = mysql.createConnection({
  host: _host,
  user: _user,
  password: _password,
  port: _port,
  database: _database,
});

export default connection;
