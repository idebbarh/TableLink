import { query } from "../database/mysql";
import { getTodaysFullDate } from "../utils/functions";
//todays
const getTodaysBookings = async (
  restaurant_id: string | number
): Promise<{ bookings: number }> => {
  const todayFullDate = getTodaysFullDate();
  console.log(todayFullDate);
  const bookings = (await query(
    "select count(*) as bookings from reservations where restaurant_id = ? and date = ?",
    [restaurant_id, todayFullDate]
  )) as { bookings: number }[];
  return bookings[0];
};
const getTodaysRevenues = async (
  restaurant_id: string | number
): Promise<{ revenues: number }> => {
  const todayFullDate = getTodaysFullDate();
  const revenues = (await query(
    `select sum(p.price) as revenues from commands c 
        inner join plates p
        on c.plate_id = p.id 
        where c.restaurant_id = ? and c.is_payed = 1 and c.date = ?
    `,
    [restaurant_id, todayFullDate]
  )) as { revenues: number | null }[];
  return { revenues: revenues[0].revenues === null ? 0 : revenues[0].revenues };
};
//month
const getThisMonthBookings = async (
  restaurant_id: string | number
): Promise<{ bookings: number }> => {
  const todayFullDate = getTodaysFullDate();
  const month = todayFullDate.split("-")[1];
  const year = todayFullDate.split("-")[0];
  const bookings = (await query(
    "select count(*) as bookings from reservations where restaurant_id = ? and MONTH(date) = ? and YEAR(date) = ?",
    [restaurant_id, month, year]
  )) as { bookings: number }[];
  return bookings[0];
};
const getThisMonthRevenues = async (
  restaurant_id: string | number
): Promise<{ revenues: number }> => {
  const todayFullDate = getTodaysFullDate();
  const month = todayFullDate.split("-")[1];
  const year = todayFullDate.split("-")[0];
  const revenues = (await query(
    `select sum(p.price) as revenues from commands c 
        inner join plates p
        on c.plate_id = p.id 
        where c.restaurant_id = ? and c.is_payed = 1 and MONTH(c.date) = ? and YEAR(c.date) = ?
    `,
    [restaurant_id, month, year]
  )) as { revenues: number | null }[];
  return { revenues: revenues[0].revenues === null ? 0 : revenues[0].revenues };
};
//year
const getThisYearBookings = async (
  restaurant_id: string | number
): Promise<{ bookings: number }> => {
  const todayFullDate = getTodaysFullDate();
  const year = todayFullDate.split("-")[0];
  const bookings = (await query(
    "select count(*) as bookings from reservations where restaurant_id = ? and YEAR(date) = ?",
    [restaurant_id, year]
  )) as { bookings: number }[];
  return bookings[0];
};
const getThisYearRevenues = async (
  restaurant_id: string | number
): Promise<{ revenues: number }> => {
  const todayFullDate = getTodaysFullDate();
  const year = todayFullDate.split("-")[0];
  const revenues = (await query(
    `select sum(p.price) as revenues from commands c 
        inner join plates p
        on c.plate_id = p.id 
        where c.restaurant_id = ? and c.is_payed = 1 and YEAR(c.date) = ?
    `,
    [restaurant_id, year]
  )) as { revenues: number | null }[];
  return { revenues: revenues[0].revenues === null ? 0 : revenues[0].revenues };
};

const StatisticRepository = {
  getTodaysBookings,
  getTodaysRevenues,
  getThisMonthBookings,
  getThisMonthRevenues,
  getThisYearBookings,
  getThisYearRevenues,
};

export default StatisticRepository;
