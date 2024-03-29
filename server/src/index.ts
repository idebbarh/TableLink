import { createTables } from "./database/mysql";
import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  try {
    //create tables
    await createTables();
    //start the express server
    const server = app.listen(4000, () => console.log("listing on port 4000"));
    process.on("SIGINT", () => {
      server.close(() => {
        console.log("close server");
        /* closeDBConnection(); */
        process.exit(0);
      });
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
