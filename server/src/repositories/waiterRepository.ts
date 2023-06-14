import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import WaiterModel from "../models/waiterModel";

const createWaiter = async (
  waiter: Pick<WaiterModel, "name" | "email" | "password" | "restaurant_id">
) => {
  const { name, email, password, restaurant_id } = waiter;
  const { insertId } = (await query(
    "insert into waiters (name,email,password,restaurant_id) values (?,?,?,?)",
    [name, email, password, restaurant_id]
  )) as ResultSetHeader;
  const createdWaiter = await getById(insertId);
  if (!createdWaiter) {
    throw Error("somethig weard prevent from creating waiter");
  }
  return createdWaiter;
};

const getAll = async (owner_id: number): Promise<WaiterModel[]> => {
  const res = (await query(
    `select w.* from waiters 
        w join restaurants r on 
        r.id = w.restaurant_id
        join owners o
        on r.owner_id = o.id
        where o.id = ?`,
    [owner_id]
  )) as WaiterModel[];
  return res;
};

const getById = async (id: string | number): Promise<WaiterModel | null> => {
  const res = (await query("select * from waiters where id = ?", [
    id,
  ])) as WaiterModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const WaiterRepository = {
  createWaiter,
  getById,
  getAll,
};

export default WaiterRepository;
