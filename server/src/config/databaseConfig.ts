import mysql from "mysql2";
import { promisify } from "util";
import QUERIES from "../database/queries";

//config
const connection = mysql.createConnection({
  host: "localhost",
  user: "debbarh",
  password: "debbarh",
  port: 3306,
  database: "table_link",
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
