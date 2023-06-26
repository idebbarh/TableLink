interface CommandModel {
  id: string | number;
  is_cooked: 0 | 1;
  is_served: 0 | 1;
  is_payed: 0 | 1;
  plate_id: string | number;
  waiter_id: string | number;
  chef_id: string | number;
  date: string;
  restaurant_id: string | number;
  createdAt: string;
  updatedAt: string;
}

export default CommandModel;
