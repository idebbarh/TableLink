import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { UserModel } from "../models/userModel";

const createUser = async (
  user: Pick<UserModel, "email" | "lives_in">
): Promise<UserModel> => {
  const { email, lives_in } = user;
  const { insertId } = (await query(
    "insert into users (email,lives_in) values (?,?)",
    [email, lives_in]
  )) as ResultSetHeader;
  const createdUser = await getById(insertId);
  if (!createdUser) {
    throw Error("somethig weard prevent creating the user");
  }
  return createdUser;
};

const getById = async (id: number): Promise<UserModel | null> => {
  const res = (await query("select * from users where id = ?", [
    id,
  ])) as UserModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const getByQuery = async (
  queryObj: Partial<UserModel>
): Promise<UserModel | null> => {
  let _query = "select * from users where";
  let queryValues: (string | number | null)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ?`;
    queryValues.push(value);
  });
  const res = (await query(_query, queryValues)) as UserModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const UserRepository = {
  getByQuery,
  getById,
  createUser,
};

export default UserRepository;
