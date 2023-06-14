export interface RestaurantModel {
  id: number | string;
  name: string;
  tele: string | null;
  description: string | null;
  owner_id: number | string;
  tables_number: number | null;
  createdAt: string;
  updatedAt: string;
}
