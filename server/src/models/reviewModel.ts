interface ReviewModel {
  id: number;
  rating: number;
  client_id: number;
  restaurant_id: number;
  createdAt: string;
  updatedAt: string;
}

export default ReviewModel;
