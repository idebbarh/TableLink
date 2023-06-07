import query from "../config/databaseConfig";
import { UserModel } from "../models/userModel";
import { hashPassword } from "../utils/password";

const createUser = async (
  user: Pick<UserModel, "name" | "email" | "password" | "user_type">
): Promise<UserModel> => {
  const { name, email, password, user_type } = user;
  const hashedPassword = await hashPassword(password);
  await query(
    "insert into users (name,email,password,user_type,restaurant_id) values (?,?,?,?,?)",
    [name, email, hashedPassword, user_type, null]
  );
  const createdUser = await getUser(email);

  if (!createdUser) {
    throw Error("somethig weird prevent the from creating the user");
  }

  return createdUser;
};

const getUser = async (email: string): Promise<UserModel | null> => {
  const res = (await query("select * from users where email = ?", [
    email,
  ])) as UserModel[];

  if (res.length === 0) {
    return null;
  }

  return res[0];
};

const UserRepository = {
  createUser,
  getUser,
};

export default UserRepository;
