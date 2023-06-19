interface ReservationModel {
  id: number | string;
  date: string;
  time: string;
  guests: number;
  client_id: number | string;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
}

export default ReservationModel;
