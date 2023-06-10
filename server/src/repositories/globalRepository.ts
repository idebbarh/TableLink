import { ResultSetHeader } from "mysql2";
import { queryWithTransaction } from "../database/mysql";
import { restaurantModel } from "../models/restaurantModel";
import { UserModel } from "../models/userModel";
import UserRepository from "./userRepository";
import restaurantRepository from "./restaurantRepository";

const createUserAndRestaurantWithTransaction = async (
  user: Pick<UserModel, "name" | "email" | "password" | "user_type">
): Promise<[UserModel, restaurantModel]> => {
  const { name, email, password, user_type } = user;
  const [{ insertId: userInsertId }, { insertId: restaurantInsertId }] =
    (await queryWithTransaction([
      {
        query:
          "insert into users (name,email,password,user_type) values (?,?,?,?)",
        params: [name, email, password, user_type],
      },
      {
        query:
          "insert into restaurants (name,tele,description,owner_id,tables_number) value(?,?,?,?,?)",
        params: [name, null, null, null],
        dataFromTransaction: { fromIndex: 0, dataPlaceIndex: 3 },
      },
    ])) as [ResultSetHeader, ResultSetHeader];
  const createdUser = await UserRepository.getUserById(userInsertId);
  const createdRestaurant = await restaurantRepository.getRestaurantById(
    restaurantInsertId
  );
  if (!createdUser) {
    throw Error("something weird prevent from creating user");
  }
  if (!createdRestaurant) {
    throw Error("something weird prevent from creating restaurant");
  }
  return [createdUser, createdRestaurant];
};

const globalRepository = { createUserAndRestaurantWithTransaction };

export default globalRepository;
