import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { UserModel } from "../models/userModel";
import { hashPassword } from "../utils/password";

const createUser = async (
  user: Pick<UserModel, "name" | "email" | "password" | "user_type">
): Promise<UserModel> => {
  const { name, email, password, user_type } = user;
  const hashedPassword = await hashPassword(password);
  const { insertId } = (await query(
    "insert into users (name,email,password,user_type) values (?,?,?,?)",
    [name, email, hashedPassword, user_type, null]
  )) as ResultSetHeader;
  const createdUser = await getUserById(insertId);

  if (!createdUser) {
    throw Error("somethig weird prevent the from creating the user");
  }

  return createdUser;
};

const getUserById = async (id: number): Promise<UserModel | null> => {
  const res = (await query("select * from users where id = ?", [
    id,
  ])) as UserModel[];

  if (res.length === 0) {
    return null;
  }

  return res[0];
};

const getUserByQuery = async (
  queryObj: Partial<UserModel>
): Promise<UserModel | null> => {
  let _query = "select * from users where";
  let queryValues: (string | number)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    queryValues.push(value);
    _query += ` ${key} = ?`;
  });
  const res = (await query(_query, queryValues)) as UserModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const UserRepository = {
  getUserByQuery,
  createUser,
  getUserById,
};

export default UserRepository;
