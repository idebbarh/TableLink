import connection from "../config/databaseConfig";

const executeMethodsWithTransaction = async (
  methods: ((...args: any) => Promise<any>)[],
  opts?: { from: number; to: number }[]
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
          if (opts && opts.some((opt) => opt.to === transactionIndex)) {
            const opt = opts.find((opt) => opt.to === transactionIndex);
            if (opt) {
              res = await currentTransaction(transactionsResults[opt.from].id);
            } else {
              res = await currentTransaction();
            }
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
