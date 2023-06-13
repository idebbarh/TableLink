import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { OwnerModel } from "../models/ownerModel";

const createOwner = async (
  owner: Pick<OwnerModel, "name" | "email" | "password">
): Promise<OwnerModel> => {
  const { name, email, password } = owner;
  const { insertId } = (await query(
    "insert into owners (name,email,password) values (?,?,?)",
    [name, email, password]
  )) as ResultSetHeader;
  const createdOwner = await getById(insertId);
  if (!createdOwner) {
    throw Error("something weard prevent from crating the owner ");
  }
  return createdOwner;
};

const getByQuery = async (
  queryObj: Partial<OwnerModel>
): Promise<OwnerModel | null> => {
  let _query = "select * from owners where";
  let queryValues: (string | number | null)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ?`;
    queryValues.push(value);
  });
  const res = (await query(_query, queryValues)) as OwnerModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const getById = async (id: number): Promise<OwnerModel | null> => {
  const owner = (await query("select * from owners where id = ?", [
    id,
  ])) as OwnerModel[];
  if (owner.length === 0) {
    return null;
  }
  return owner[0];
};

const OwnerRepository = {
  createOwner,
  getByQuery,
  getById,
};

export default OwnerRepository;
