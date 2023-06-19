interface ChefModel {
  id: number | string;
  name: string;
  email: string;
  password: string;
  is_available: 0 | 1;
  restaurant_id: number | string;
  commands_number: number;
  createdAt: string;
  updatedAt: string;
}

export default ChefModel;
