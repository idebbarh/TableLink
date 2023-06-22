declare interface SideBarOptionType {
  title: string;
  path: string;
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
  id: number | string;
  email: string;
  name: string;
  lives_in: "owners" | "clients" | "waiters" | "chefs";
  createdAt: string;
  updatedAt: string;
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
  id: number;
  description: string | null;
  name: string | null;
  owner_id: number;
  tables_number: number | null;
  tele: string | null;
  todaysBookings: number;
  rating: string;
  numberOfReviews: number;
  updatedAt: string;
  createdAt: string;
}
declare interface Reservation {
  id: number;
  date: string;
  time: string;
  guests: number;
  client_id: number;
  restaurant_id: number;
  createdAt: string;
  updatedAt: string;
}

declare interface Plate {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  restaurant_id: number;
  createdAt: string;
  updatedAt: string;
}
declare interface Review {
  id: number;
  rating: number;
  client_id: number;
  restaurant_id: number;
  createdAt: string;
  updatedAt: string;
}
