import connection from "../config/databaseConfig";
import { UserModel } from "../models/userModel";

const executeMethodsWithTransaction = async (
  methods: ((...args: any) => Promise<any>)[],
  opts?: { from: number; to: number }
) => {
  return new Promise((resolve, reject) => {
    connection.beginTransaction((err) => {
      if (err) {
        connection.rollback(() => reject(err));
        return;
      }

      const nextTransaction = async (
        transactionIndex: number,
        transactionsResults: any[]
      ) => {
        if (transactionIndex >= methods.length) {
          connection.commit((err) => {
            if (err) {
              connection.rollback(() => reject(err));
              return;
            }
          });
          resolve(transactionsResults);
          return;
        }
        const currentTransaction = methods[transactionIndex];
        try {
          let res: any;
          if (opts && opts.to === transactionIndex) {
            res = await currentTransaction(transactionsResults[opts.from].id);
          } else {
            res = await currentTransaction();
          }
          nextTransaction(transactionIndex + 1, [...transactionsResults, res]);
        } catch (err) {
          connection.rollback(() => reject(err));
          return;
        }
      };
      nextTransaction(0, []);
    });
  });
};

export default executeMethodsWithTransaction;
