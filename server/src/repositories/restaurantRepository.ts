import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { RestaurantModel } from "../models/restaurantModel";

const createRestaurant = async (
  restaurant: Pick<RestaurantModel, "name" | "owner_id">
): Promise<RestaurantModel> => {
  const { name, owner_id } = restaurant;
  const { insertId } = (await query(
    "insert into restaurants (name,tele,description,owner_id,tables_number) values(?,?,?,?,?)",
    [name, null, null, owner_id, 0]
  )) as ResultSetHeader;

  const createdRestaurant = await getRestaurantById(insertId);
  if (!createdRestaurant) {
    throw Error("somethig weird prevent the from creating the restaurant");
  }
  return createdRestaurant;
};

const getRestaurantById = async (
  id: number
): Promise<RestaurantModel | null> => {
  const res = (await query("select * from restaurants where id = ?", [
    id,
  ])) as RestaurantModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const RestaurantRepository = {
  createRestaurant,
  getRestaurantById,
};

export default RestaurantRepository;
