import {
  connectToDB,
  createTables,
  closeDBConnection,
} from "./config/databaseConfig";
import app from "./server";

const startServer = async () => {
  try {
    //connect to db
    await connectToDB();
    console.log("connected to database");
    //start the express server
    const server = app.listen(5000, () => console.log("listing on port 5000"));
    process.on("SIGINT", () => {
      server.close(() => {
        closeDBConnection();
        process.exit(0);
      });
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
