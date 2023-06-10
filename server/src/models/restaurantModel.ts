export interface restaurantModel {
  id: number;
  name: string;
  tele: string | null;
  description: string | null;
  owner_id: number;
  tables_number: number | null;
  createdAt: string;
  updatedAt: string;
}
