import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import CommandModel from "../models/commandModel";

const createCommand = async (
  plate_id: string | number,
  chef_id: string | number,
  restaurant_id: string | number
): Promise<CommandModel> => {
  const { insertId } = (await query(
    "insert into commands (plate_id,waiter_id,chef_id,restaurant_id) values (?,?,?,?)",
    [plate_id, null, chef_id, restaurant_id]
  )) as ResultSetHeader;
  const createdCommand = await getById(insertId);

  if (!createdCommand) {
    throw Error("somethig bad prevent from creating the command");
  }
  return createdCommand;
};

const getById = async (id: string | number): Promise<CommandModel | null> => {
  const commnad = (await query("select * from commands where id = ?", [
    id,
  ])) as CommandModel[];
  if (commnad.length === 0) {
    return null;
  }
  return commnad[0];
};

const getManyByQuery = async (
  queryObj: Partial<CommandModel>
): Promise<CommandModel[]> => {
  let _query =
    "select cmd.*, pl.name from commands cmd join plates pl on cmd.plate_id = pl.id where";
  const queryValues: (string | number)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` cmd.${key} = ? and`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 3);
  _query += "order by cmd.updatedAt";
  const commands = (await query(_query, queryValues)) as CommandModel[];
  return commands;
};

const updateCols = async (
  id: string | number,
  cols: Partial<CommandModel>,
  restaurant_id?: string | number
): Promise<CommandModel> => {
  let _query = "update commands set";
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

  const updatedCommand = await getById(id);
  if (!updatedCommand) {
    throw Error("this not suppose to happend just to make ts happy");
  }

  return updatedCommand;
};
const deleteById = async (
  id: string | number,
  restaurant_id: string | number
): Promise<void> => {
  await query("delete from commands where id = ? and restaurant_id = ?", [
    id,
    restaurant_id,
  ]);
  const deletedWaiter = await getById(id);
  if (deletedWaiter) {
    throw Error("something weard prevent from deleting the waiter");
  }
};

const CommandRepository = {
  createCommand,
  getById,
  getManyByQuery,
  updateCols,
  deleteById,
};

export default CommandRepository;
