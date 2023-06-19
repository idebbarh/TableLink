import ReviewModel from "../models/reviewModel";
import { query } from "../database/mysql";
import { ResultSetHeader } from "mysql2";

const createReview = async (
  review: Pick<ReviewModel, "rating" | "client_id" | "restaurant_id">
): Promise<ReviewModel> => {
  const { rating, client_id, restaurant_id } = review;
  const { insertId } = (await query(
    `
                        INSERT INTO reviews (rating, client_id, restaurant_id)
                        VALUES (?,?,?)
                        ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
    [rating, client_id, restaurant_id]
  )) as ResultSetHeader;
  let _review = await getById(insertId);
  if (!_review) {
    _review = await getByQuery({ client_id, restaurant_id });
    if (!_review) {
      throw Error("somethig weard prevent from the creating of the reveiw");
    }
  }
  return _review;
};

const getById = async (id: string | number): Promise<ReviewModel | null> => {
  const review = (await query("select * from reviews where id = ?", [
    id,
  ])) as ReviewModel[];
  if (review.length === 0) {
    return null;
  }
  return review[0];
};

const getManyByQuery = async (
  queryObj: Partial<ReviewModel>
): Promise<ReviewModel[]> => {
  let _query = "select * from reviews where";
  const queryValues: (string | number)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ? and`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 3);
  const res = (await query(_query, queryValues)) as ReviewModel[];
  return res;
};

const getByQuery = async (
  queryObj: Partial<ReviewModel>
): Promise<ReviewModel | null> => {
  let _query = "select * from reviews where";
  const queryValues: (string | number)[] = [];
  Object.entries(queryObj).forEach(([key, value]) => {
    _query += ` ${key} = ? and`;
    queryValues.push(value);
  });
  _query = _query.slice(0, _query.length - 3);
  const res = (await query(_query, queryValues)) as ReviewModel[];
  if (res.length === 0) {
    return null;
  }
  return res[0];
};
const ReviewRepository = {
  createReview,
  getById,
  getManyByQuery,
  getByQuery,
};

export default ReviewRepository;
