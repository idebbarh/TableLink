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
  const createdWaiter = await getById(insertId, restaurant_id);
  if (!createdWaiter) {
    throw Error("somethig weard prevent from creating waiter");
  }
  return createdWaiter;
};

const getAll = async (owner_id: number | string): Promise<WaiterModel[]> => {
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

const getById = async (
  id: string | number,
  restaurant_id?: string | number
): Promise<WaiterModel | null> => {
  let _query = "select * from waiters where id = ?";
  let queryValues = [id];
  if (restaurant_id) {
    _query += " and restaurant_id = ?";
    queryValues.push(restaurant_id);
  }
  const res = (await query(_query, queryValues)) as WaiterModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const deleteById = async (
  id: string | number,
  restaurant_id: string | number
): Promise<void> => {
  await query("delete from waiters where id = ? and restaurant_id = ?", [
    id,
    restaurant_id,
  ]);
  const deletedWaiter = await getById(id, restaurant_id);
  if (deletedWaiter) {
    throw Error("something weard prevent from deleting the waiter");
  }
};

const updateCols = async (
  id: number | string,
  cols: Partial<WaiterModel>,
  restaurant_id?: number | string
): Promise<WaiterModel> => {
  let _query = "update waiters set";
  const queryValues: (string | number)[] = [];

  Object.entries(cols).forEach(([key, value]) => {
    _query += ` ${key} = ?,`;
    queryValues.push(value);
  });

  _query = _query.slice(0, _query.length - 1);
  _query += " where id = ?";
  queryValues.push(id);

  if (restaurant_id) {
    _query += " and restaurant_id = ?";
    queryValues.push(restaurant_id);
  }

  await query(_query, queryValues);

  const updatedWaiter = await getById(id, restaurant_id);
  if (!updatedWaiter) {
    throw Error("this not suppose to happend just to make ts happy");
  }

  return updatedWaiter;
};

const WaiterRepository = {
  createWaiter,
  getById,
  getAll,
  deleteById,
  updateCols,
};

export default WaiterRepository;
