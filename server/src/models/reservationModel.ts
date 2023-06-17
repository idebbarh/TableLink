interface ReservationModel {
  id: number | string;
  date: string;
  guests: number;
  client_id: number | string;
  restaurant_id: number | string;
}

export default ReservationModel;
