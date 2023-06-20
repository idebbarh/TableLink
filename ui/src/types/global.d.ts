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
