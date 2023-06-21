import { ResultSetHeader } from "mysql2";
import { query } from "../database/mysql";
import ReservationModel from "../models/reservationModel";

const createReservation = async (
  reservation: Omit<ReservationModel, "id" | "createdAt" | "updatedAt">
): Promise<ReservationModel> => {
  const { date, time, guests, client_id, restaurant_id } = reservation;
  const { insertId } = (await query(
    "insert into reservations (date,time,guests,client_id,restaurant_id) values (?,?,?,?,?)",
    [date, time, guests, client_id, restaurant_id]
  )) as ResultSetHeader;
  const createdReservation = await getById(insertId, restaurant_id);
  if (!createdReservation) {
    throw Error("something weard prevent the creating of reservation");
  }
  return createdReservation;
};

const getById = async (
  id: number | string,
  restaurant_id: number | string
): Promise<ReservationModel | null> => {
  const res = (await query(
    "select * from reservations where id = ? and restaurant_id = ?",
    [id, restaurant_id]
  )) as ReservationModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};

const getManyByQuery = async (
  queryObj: Partial<ReservationModel>
): Promise<ReservationModel[]> => {
  let _query = "select * from reservations where";
  const queryValues: (string | number)[] = [];

  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ? and`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 3);
  const res = (await query(_query, queryValues)) as ReservationModel[];
  return res;
};

const deleteById = async (
  id: string | number,
  restaurant_id: string | number
): Promise<void> => {
  await query("delete from reservations where id = ? and restaurant_id = ?", [
    id,
    restaurant_id,
  ]);
  const deletedReservation = await getById(id, restaurant_id);
  if (deletedReservation) {
    throw Error("something weard prevent from deleting the reservation");
  }
};

const ReservationRepository = {
  createReservation,
  getById,
  getManyByQuery,
  deleteById,
};

export default ReservationRepository;
