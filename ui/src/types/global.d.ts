declare interface SideBarOptionType {
  title: string;
  path: string;
  validIn: ("owners" | "waiters" | "chefs")[];
}

declare interface IEmployee {
  id: number;
  name: string;
  job: string;
  email: string;
  password: string;
}

declare interface IMenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  ingredients:
    | {
        id: number;
        name: string;
      }[]
    | string;
}

declare interface IReservation {
  id: number;
  name: string;
  date: string;
  time: string;
  people: number;
}

//------------------------
declare interface User {
  email: string;
  name: string;
  lives_in: "owners" | "clients" | "waiters" | "chefs";
  restaurant_id?: number | string;
}

declare type SignupFromData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

declare type SubmitSignupFormData = Omit<SignupFromData, "confirmPassword"> & {
  lives_in: "clients" | "owners";
};

declare type MyKnownError = { errorMessage: string };

declare interface Restaurant {
  id: number | string;
  description: string | null;
  name: string | null;
  owner_id: number | string;
  tables_number: number | null;
  tele: string | null;
  todaysBookings: number;
  rating: string;
  numberOfReviews: number;
  updatedAt: string;
  createdAt: string;
}

declare interface Plate {
  id: number | string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
}
declare interface Review {
  id: number | string;
  rating: number;
  client_id: number | string;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
}

declare interface Waiter {
  id: number | string;
  name: string;
  email: string;
  password: string;
  is_available: 0 | 1;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
}
declare interface Chef {
  id: number | string;
  name: string;
  email: string;
  password: string;
  is_available: 0 | 1;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
}
declare interface Reservation {
  id: number | string;
  date: string;
  time: string;
  guests: number;
  client_id: number | string;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
  client_name: string;
}
declare interface Statistics {
  todaysBookings: number;
  todaysRevenues: number;
  thisMonthBookings: number;
  thisMonthRevenues: number;
  thisYearBookings: number;
  thisYearRevenues: number;
}
declare interface Plate {
  id: number | string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  restaurant_id: number | string;
  createdAt: string;
  updatedAt: string;
}
declare interface Availability {
  is_available: 0 | 1;
}

declare interface Command {
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
