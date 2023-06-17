import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { PlateModel } from "../models/plateModel";

/* id INT AUTO_INCREMENT PRIMARY KEY, */
/* name VARCHAR(255) NOT NULL, */
/* description VARCHAR(255) NOT NULL, */
/* ingredients VARCHAR(255) NOT NULL, */
/* price INT NOT NULL, */
/* restaurant_id INT, */
/* createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, */
/* updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, */
/* FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) */

const createPlate = async (
  plate: Pick<
    PlateModel,
    "name" | "description" | "ingredients" | "price" | "restaurant_id"
  >
): Promise<PlateModel> => {
  const { name, description, ingredients, price, restaurant_id } = plate;
  const { insertId } = (await query(
    "insert into plates (name,description,ingredients,price,restaurant_id) values (?,?,?,?,?)",
    [name, description, ingredients, price, restaurant_id]
  )) as ResultSetHeader;
  const createdPlate = await getById(insertId, restaurant_id);
  if (!createdPlate) {
    throw Error("something weard prevent creating the plate");
  }
  return createdPlate;
};

const getById = async (
  id: number | string,
  restaurant_id: number | string
): Promise<PlateModel | null> => {
  const res = (await query(
    "select * from plates where id = ? and restaurant_id = ?",
    [id, restaurant_id]
  )) as PlateModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const getManyByQuery = async (
  queryObj: Partial<PlateModel>
): Promise<PlateModel[]> => {
  let _query = "select * from plates where";
  const queryValues: (string | number)[] = [];

  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ? and`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 3);
  const res = (await query(_query, queryValues)) as PlateModel[];
  return res;
};

const deleteById = async (
  id: string | number,
  restaurant_id: string | number
): Promise<void> => {
  await query("delete from plates where id = ? and restaurant_id = ?", [
    id,
    restaurant_id,
  ]);
  const deletedPlate = await getById(id, restaurant_id);
  if (deletedPlate) {
    throw Error("something weard prevent from deleting the chef");
  }
};

const updateCols = async (
  id: number | string,
  cols: Partial<PlateModel>,
  restaurant_id: number | string
): Promise<PlateModel> => {
  let _query = "update plates set";
  const queryValues: (string | number)[] = [];

  Object.entries(cols).forEach(([key, value]) => {
    _query += ` ${key} = ?,`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 1);
  _query += " where restaurant_id = ? and id = ?";
  queryValues.push(restaurant_id, id);
  await query(_query, queryValues);
  const updatedPlate = await getById(id, restaurant_id);
  if (!updatedPlate) {
    throw Error("plate no found");
  }
  return updatedPlate;
};
const PlateRepository = {
  createPlate,
  getById,
  getManyByQuery,
  deleteById,
  updateCols,
};

export default PlateRepository;
