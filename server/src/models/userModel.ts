import { UserType } from "../types/types";

export interface UserModel {
  id: number | string;
  email: string;
  lives_in: UserType;
  createdAt: string;
  updatedAt: string;
}
