interface ReviewModel {
  id: number;
  rating: number;
  client_id: number | string;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
}

export default ReviewModel;
