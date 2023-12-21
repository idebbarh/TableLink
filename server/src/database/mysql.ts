import connection from "../config/databaseConfig";
import QUERIES from "./queries";

const query = (query: string, options: any[] = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, options, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const queryWithTransaction = (
  queries: Array<{
    query: string;
    params?: any[];
  }>,
) => {
  return new Promise((resolve, reject) => {
    //start the transaction
    connection.beginTransaction((err) => {
      //if an err in the beginTransaction will rollback
      if (err) {
        // the roll back will pass the err to the Promise reject

        connection.rollback(() => reject(err));
        return;
      }
      //if not err
      //define function that take the index of the current transaction
      //and the result of all the prev transactions
      const nextTransaction = (
        transactionIndex: number,
        transactionsResults: any[],
      ) => {
        //if the index is equal to the lenght of the queries
        //then we are make all the transactions and we need to commit
        if (transactionIndex >= queries.length) {
          connection.commit((err) => {
            //if an err in the commit we will rollback
            if (err) {
              console.log("rollback because commit err");
              connection.rollback(() => reject(err));
              return;
            }
            //else we pass the result of all the transactions to the resolve
          });

          return resolve(transactionsResults);
        }

        const currentTransaction = queries[transactionIndex];
        connection.query(
          currentTransaction.query,
          currentTransaction.params ?? [],
          (err, res) => {
            // if an err in the query we will rollback
            if (err) {
              connection.rollback(() => reject(err));
              return;
            }

            //else we move to the next transaction
            nextTransaction(transactionIndex + 1, [
              ...transactionsResults,
              res,
            ]);
          },
        );
      };
      nextTransaction(0, []);
    });
  });
};

//create tables
const createTables = async () => {
  for (let key of Object.keys(QUERIES.CREATE_TABLES)) {
    await query(
      QUERIES.CREATE_TABLES[key as keyof typeof QUERIES.CREATE_TABLES],
    );
  }
  console.log("tables created succussfully");
};

//close the connection
const closeDBConnection = () => {
  connection.end();
};
export { query, queryWithTransaction, createTables, closeDBConnection };
