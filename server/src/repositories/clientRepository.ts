import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import { OwnerModel } from "../models/ownerModel";
import { ClientModel } from "../models/clientModel";

const createClient = async (
  client: Pick<ClientModel, "name" | "email" | "password">
): Promise<ClientModel> => {
  const { name, email, password } = client;
  const { insertId } = (await query(
    "insert into clients (name,email,password) values (?,?,?)",
    [name, email, password]
  )) as ResultSetHeader;
  const createdClient = await getById(insertId);
  if (!createdClient) {
    throw Error("something weard prevent from crating the owner ");
  }
  return createdClient;
};

const getByQuery = async (
  queryObj: Partial<ClientModel>
): Promise<ClientModel | null> => {
  let _query = "select * from clients where";
  let queryValues: (string | number | null)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ?`;
    queryValues.push(value);
  });
  const res = (await query(_query, queryValues)) as ClientModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const getById = async (id: number | string): Promise<OwnerModel | null> => {
  const client = (await query("select * from clients where id = ?", [
    id,
  ])) as ClientModel[];
  if (client.length === 0) {
    return null;
  }
  return client[0];
};

const ClientRepository = {
  createClient,
  getByQuery,
  getById,
};

export default ClientRepository;
