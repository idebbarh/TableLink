import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { RestaurantModel } from "../models/restaurantModel";
import { getTodaysFullDate } from "../utils/functions";

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
  const todayDate = getTodaysFullDate();
  const res = (await query(
    `SELECT res.*,
    COALESCE(todaysBookings, 0) AS todaysBookings,
    ROUND(IF(numberOfReviews > 0, totalRating / numberOfReviews, 0), 2) AS rating,
    COALESCE(numberOfReviews, 0) AS numberOfReviews
    FROM restaurants res
    LEFT JOIN (
        SELECT restaurant_id, COUNT(id) AS todaysBookings
        FROM reservations
        WHERE date = ?
        GROUP BY restaurant_id
    ) AS rsv ON res.id = rsv.restaurant_id
    LEFT JOIN (
        SELECT restaurant_id, COUNT(id) AS numberOfReviews, SUM(rating) AS totalRating
        FROM reviews
        GROUP BY restaurant_id
  ) AS rev ON res.id = rev.restaurant_id
    where id = ?
    `,
    [todayDate, id]
  )) as RestaurantModel[];
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
  const todayDate = getTodaysFullDate();
  const allRestaurants = (await query(
    `SELECT res.*,
    COALESCE(todaysBookings, 0) AS todaysBookings,
    ROUND(IF(numberOfReviews > 0, totalRating / numberOfReviews, 0), 2) AS rating,
    COALESCE(numberOfReviews, 0) AS numberOfReviews
    FROM restaurants res
    LEFT JOIN (
        SELECT restaurant_id, COUNT(id) AS todaysBookings
        FROM reservations
        WHERE date = ?
        GROUP BY restaurant_id
    ) AS rsv ON res.id = rsv.restaurant_id
    LEFT JOIN (
        SELECT restaurant_id, COUNT(id) AS numberOfReviews, SUM(rating) AS totalRating
        FROM reviews
        GROUP BY restaurant_id
    ) AS rev ON res.id = rev.restaurant_id`,
    [todayDate]
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
  const res = (await query(
    "select if(COALESCE(reservations_count,0) < res.tables_number,1,0) as is_available from restaurants res left join (select count(*) as reservations_count,restaurant_id from reservations where date = ? group by restaurant_id) as rsv on res.id = rsv.restaurant_id where res.id = ?",
    [date, id]
  )) as [
    {
      is_available: 0 | 1;
    }
  ];
  console.log(res);
  return res[0];
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
