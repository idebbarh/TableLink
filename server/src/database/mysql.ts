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
    dataFromTransaction?: { fromIndex: number; dataPlaceIndex: number };
  }>
) => {
  return new Promise((resolve, reject) => {
    //start the transaction
    connection.beginTransaction((err) => {
      //if an err in the beginTransaction will rollback
      if (err) {
        // the roll back will pass the err to the Promise reject
        connection.rollback((err) => reject(err));
        return;
      }
      //if not err
      //define function that take the index of the current transaction
      //and the result of all the prev transactions
      const nextTransaction = (
        transactionIndex: number,
        transactionsResults: any[]
      ) => {
        //if the index is equal to the lenght of the queries
        //then we are make all the transactions and we need to commit
        if (transactionIndex === queries.length) {
          connection.commit((err) => {
            //if an err in the commit we will rollback
            if (err) {
              connection.rollback((err) => reject(err));
              return;
            }
            //else we pass the result of all the transactions to the resolve
            resolve(transactionsResults);
          });
        }

        //take the current query
        const currentTransaction = queries[transactionIndex];
        const currentTransactionParams = currentTransaction.params
          ? currentTransaction.dataFromTransaction
            ? [
                ...currentTransaction.params.slice(
                  0,
                  currentTransaction.dataFromTransaction.dataPlaceIndex
                ),
                transactionsResults[
                  currentTransaction.dataFromTransaction.fromIndex
                ],
                ...currentTransaction.params.slice(
                  currentTransaction.dataFromTransaction.fromIndex
                ),
              ]
            : currentTransaction.params
          : currentTransaction.dataFromTransaction
          ? transactionsResults[
              currentTransaction.dataFromTransaction.fromIndex
            ]
          : [];
        connection.query(
          currentTransaction.query,
          [...currentTransactionParams],
          (err, res) => {
            // if an err in the query we will rollback
            if (err) {
              connection.rollback((err) => reject(err));
              return;
            }
            //else we move to the next transaction
            nextTransaction(transactionIndex + 1, [
              ...transactionsResults,
              res,
            ]);
          }
        );
      };
      nextTransaction(0, []);
    });
  });
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
export { query, queryWithTransaction, createTables, closeDBConnection };
