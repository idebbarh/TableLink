import mysql from "mysql2";
import { promisify } from "util";
import QUERIES from "../database/queries";
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

//connect to database
const connect = promisify(connection.connect).bind(connection);

const connectToDB = async () => {
  await connect();
  console.log("connected succussfully to database");
  await checkConnectionToDb();
  console.log("Database connection is established");
};

const query = (query: string, options: any[] = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, options, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//check the connection
const checkConnectionToDb = async () => {
  await query("select 1");
};

//create tables
const createTables = async () => {
  Object.keys(QUERIES.CREATE_TABLES).forEach(async (key) => {
    await query(
      QUERIES.CREATE_TABLES[key as keyof typeof QUERIES.CREATE_TABLES]
    );
  });
  console.log("tables created succussfully");
};

//close the connection
const closeDBConnection = () => {
  connection.end();
};

export default query;

export { connectToDB, createTables, closeDBConnection };
