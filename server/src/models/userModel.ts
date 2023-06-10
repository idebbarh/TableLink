enum USER_TYPE {
  RESTAURANT_OWNER = "restaurant_owner",
  CLIENT = "client",
  WAITER = "waiter",
  CHEF = "chef",
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  user_type: USER_TYPE;
  createdAt: string;
  updatedAt: string;
}
