import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import ChefModel from "../models/chefModel";

const createChef = async (
  chef: Pick<ChefModel, "name" | "email" | "password" | "restaurant_id">
) => {
  const { name, email, password, restaurant_id } = chef;
  const { insertId } = (await query(
    "insert into chefs (name,email,password,restaurant_id) values (?,?,?,?)",
    [name, email, password, restaurant_id]
  )) as ResultSetHeader;
  const createdChef = await getById(insertId, restaurant_id);
  if (!createdChef) {
    throw Error("somethig weard prevent from creating chef");
  }
  return createdChef;
};

const getAll = async (owner_id: number | string): Promise<ChefModel[]> => {
  const res = (await query(
    `select c.* from chefs  
        c join restaurants r on 
        r.id = c.restaurant_id
        join owners o
        on r.owner_id = o.id
        where o.id = ?`,
    [owner_id]
  )) as ChefModel[];
  return res;
};

const getById = async (
  id: string | number,
  restaurant_id: string | number
): Promise<ChefModel | null> => {
  const res = (await query(
    "select * from chefs where id = ? and restaurant_id = ?",
    [id, restaurant_id]
  )) as ChefModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const deleteById = async (
  id: string | number,
  restaurant_id: string | number
): Promise<void> => {
  await query("delete from chefs where id = ? and restaurant_id = ?", [
    id,
    restaurant_id,
  ]);
  const deletedChef = await getById(id, restaurant_id);
  if (deletedChef) {
    throw Error("something weard prevent from deleting the chef");
  }
};
const updateCols = async (
  id: number | string,
  cols: Partial<ChefModel>,
  restaurant_id: number | string
): Promise<ChefModel> => {
  let _query = "update chefs set";
  const queryValues: (string | number)[] = [];

  Object.entries(cols).forEach(([key, value]) => {
    _query += ` ${key} = ?,`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 1);
  _query += " where restaurant_id = ? and id = ?";
  queryValues.push(restaurant_id, id);
  await query(_query, queryValues);
  const updatedChef = await getById(id, restaurant_id);
  if (!updatedChef) {
    throw Error("this not suppose to happend just to make ts happy");
  }
  return updatedChef;
};
const ChefRepository = {
  createChef,
  getById,
  getAll,
  deleteById,
  updateCols,
};

export default ChefRepository;
