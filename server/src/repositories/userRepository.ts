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

const getById = async (id: number | string): Promise<UserModel | null> => {
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
    _query += ` ${key} = ? and`;
    queryValues.push(value);
  });

  _query = _query.slice(0, _query.length - 3);
  const res = (await query(_query, queryValues)) as UserModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const deleteByEmail = async (email: string): Promise<void> => {
  await query("delete from users where email = ?", [email]);
  const deletedUser = await getByQuery({ email });
  if (deletedUser) {
    throw Error("something weard prevent from deleting the user");
  }
};

const updateEmail = async (
  emailToFind: string,
  emailToSet: string
): Promise<void> => {
  await query("update users set email = ? where email = ?", [
    emailToSet,
    emailToFind,
  ]);
};
const UserRepository = {
  getByQuery,
  getById,
  createUser,
  deleteByEmail,
  updateEmail,
};

export default UserRepository;
