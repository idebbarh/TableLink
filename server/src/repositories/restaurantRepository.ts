import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { RestaurantModel } from "../models/restaurantModel";
import { convertDateToMysqlFormate } from "../utils/functions";

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
    _query += ` ${key} = ? and`;
    queryValues.push(value);
  });

  _query = _query.slice(0, _query.length - 3);
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

const updateCols = async (
  id: number | string,
  cols: Partial<RestaurantModel>,
  owner_id: number | string
): Promise<RestaurantModel> => {
  let _query = "update restaurants set";
  const queryValues: any[] = [];

  Object.entries(cols).forEach(([key, value]) => {
    _query += ` ${key} = ?,`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 1);
  _query += " where id = ? and owner_id = ?";
  queryValues.push(id, owner_id);
  await query(_query, queryValues);
  const updatedRestaurant = await getByQuery({ id, owner_id });
  if (!updatedRestaurant) {
    throw Error("Restaurant not found");
  }
  return updatedRestaurant;
};
const checkReservationAvailability = async (
  id: number | string,
  date: string
) => {
  const mysqlDateFormat = convertDateToMysqlFormate(date);
  /* const res = await query( */
  /*   "select if(count(*) < (select tables_number from restaurants where id = ?),1,0) as is_available from reservations where restaurant_id = ? and date = ?", */
  /*   [id, id, mysqlDateFormat] */
  /* ); */
  const res = await query(
    "select if(count(rsv.id) < res.tables_number ,1,0) as is_available from restaurants res join reservations rsv on rsv.restaurant_id = res.id where res.id = ? and rsv.date = ? group by res.id",
    [id, mysqlDateFormat]
  );
  return res;
};

const RestaurantRepository = {
  createRestaurant,
  getByQuery,
  getById,
  getAll,
  updateCols,
  checkReservationAvailability,
};

export default RestaurantRepository;
