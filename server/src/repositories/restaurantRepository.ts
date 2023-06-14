import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { RestaurantModel } from "../models/restaurantModel";

const createRestaurant = async (
  restaurant: Pick<RestaurantModel, "owner_id">
): Promise<RestaurantModel> => {
  const { owner_id } = restaurant;
  const { insertId } = (await query(
    "insert into restaurants (name,tele,description,owner_id,tables_number) values(?,?,?,?,?)",
    [null, null, null, owner_id, null]
  )) as ResultSetHeader;

  const createdRestaurant = await getById(insertId);
  if (!createdRestaurant) {
    throw Error("somethig weird prevent the from creating the restaurant");
  }
  return createdRestaurant;
};

const getById = async (
  id: number | string
): Promise<RestaurantModel | null> => {
  const res = (await query("select * from restaurants where id = ?", [
    id,
  ])) as RestaurantModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};
const getByQuery = async (
  queryObj: Partial<RestaurantModel>
): Promise<RestaurantModel | null> => {
  let _query = "select * from restaurants where";
  let queryValues: (string | number | null)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ?`;
    queryValues.push(value);
  });
  const res = (await query(_query, queryValues)) as RestaurantModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const getAll = async (): Promise<RestaurantModel[]> => {
  const allRestaurants = (await query(
    "select * from restaurants"
  )) as RestaurantModel[];
  return allRestaurants;
};

const RestaurantRepository = {
  createRestaurant,
  getByQuery,
  getById,
  getAll,
};

export default RestaurantRepository;
