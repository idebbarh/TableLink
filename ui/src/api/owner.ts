import axios, { AxiosError } from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

/* waiters: { */
/*   getAllWaiters: "/api/owner/employees/waiters", */
/*   getWaiterById: "/api/owner/employees/waiters/{{id}}", */
/*   createWaiter: "/api/owner/employees/waiters", */
/*   deleteWaiter: "/api/owner/employees/waiters/{{id}}", */
/*   updateWaiter: "/api/owner/employees/waiters/{{id}}", */
/* }, */
/* chefs: { */
/*   getAllChefs: "/api/owner/employees/chefs", */
/*   getChefById: "/api/owner/employees/chefs/{{id}}", */
/*   createChef: "/api/owner/employees/chefs", */
/*   deleteChef: "/api/owner/employees/chefs/{{id}}", */
/*   updateChef: "/api/owner/employees/chefs/{{id}}", */
/* }, */
/* plates: { */
/*   getAllPlates: "/api/owner/plates", */
/*   getPlateById: "/api/owner/plates/{{id}}", */
/*   createPlate: "/api/owner/plates", */
/*   deletePlate: "/api/owner/plates/{{id}}", */
/*   updatePlate: "/api/owner/plates/{{id}}", */
/* }, */
/* reservations: { */
/*   getAllReservations: "/api/owner/reservations", */
/*   deleteReservation: "/api/owner/reservations/{{id}}", */
/* }, */
/* statistics: { */
/*   getRestaurantStatistics: "/api/owner/statistiques", */
/* }, */
/* restaurant: { */
/*   getOwnerRestaurant: "/api/owner/restaurant", */
/*   updateRestaurant: "/api/owner/restaurant/{{id}}", */
/* }, */
class OwnerApi {
  //waiters
  static async getAllWaiters(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.owner.waiters.getAllWaiters,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async deleteWaiter(id: string | number, token: string) {
    try {
      const res = await axios.delete(
        baseUrl +
          apiEndpoints.owner.waiters.deleteWaiter.replace(
            "{{id}}",
            id.toString()
          ),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async updateWaiter(
    id: string | number,
    formData: { name: string; email: string; password: string },
    token: string
  ) {
    try {
      const res = await axios.put(
        baseUrl +
          apiEndpoints.owner.waiters.deleteWaiter.replace(
            "{{id}}",
            id.toString()
          ),
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }

  static async createWaiter(
    formData: { name: string; email: string; password: string },
    token: string
  ) {
    try {
      const res = await axios.post(
        baseUrl + apiEndpoints.owner.waiters.createWaiter,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  //chefs
  static async getAllChefs(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.owner.chefs.getAllChefs,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }

  static async deleteChef(id: string | number, token: string) {
    try {
      const res = await axios.delete(
        baseUrl +
          apiEndpoints.owner.chefs.deleteChef.replace("{{id}}", id.toString()),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }

  static async updateChef(
    id: string | number,
    formData: { name: string; email: string; password: string },
    token: string
  ) {
    try {
      const res = await axios.put(
        baseUrl +
          apiEndpoints.owner.chefs.deleteChef.replace("{{id}}", id.toString()),
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }

  static async createChef(
    formData: { name: string; email: string; password: string },
    token: string
  ) {
    try {
      const res = await axios.post(
        baseUrl + apiEndpoints.owner.chefs.createChef,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }

  //reservations
  static async getAllReservations(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.owner.reservations.getAllReservations,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async deleteReservation(id: string | number, token: string) {
    try {
      const res = await axios.delete(
        baseUrl +
          apiEndpoints.owner.reservations.deleteReservation.replace(
            "{{id}}",
            id.toString()
          ),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  //commands

  static async getAllCommands(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.owner.commands.getAllCommands,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  //statistics
  static async getRestaurantStatistics(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.owner.statistics.getRestaurantStatistics,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  //getOwnerRestaurant
  static async getOwnerRestaurant(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.owner.restaurant.getOwnerRestaurant,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  //updateRestaurant
  static async updateRestaurant(
    id: number | string,
    token: string,
    data: Pick<Restaurant, "description" | "name" | "tables_number" | "tele">
  ) {
    try {
      const res = await axios.put(
        baseUrl +
          apiEndpoints.owner.restaurant.updateRestaurant.replace(
            "{{id}}",
            id.toString()
          ),
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  //menu
  static async getAllPlates(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.owner.plates.getAllPlates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async createPlate(
    token: string,
    data: Pick<Plate, "name" | "description" | "ingredients" | "price">
  ) {
    try {
      const res = await axios.post(
        baseUrl + apiEndpoints.owner.plates.createPlate,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async deletePlate(token: string, id: number | string) {
    try {
      const res = await axios.delete(
        baseUrl +
          apiEndpoints.owner.plates.deletePlate.replace(
            "{{id}}",
            id.toString()
          ),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }

  static async updatePlate(
    token: string,
    id: number | string,
    data: Pick<Plate, "name" | "description" | "ingredients" | "price">
  ) {
    try {
      const res = await axios.put(
        baseUrl +
          apiEndpoints.owner.plates.updatePlate.replace(
            "{{id}}",
            id.toString()
          ),

        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
}
export default OwnerApi;
