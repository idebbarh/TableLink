import axios, { AxiosError } from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class RestaurantApi {
  static async getAllRestaurants() {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.restaurants.getAllRestaurants
      );

      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async getRestaurant(id: number | string) {
    try {
      const res = await axios.get(
        baseUrl +
          apiEndpoints.restaurants.getRestaurantById.replace(
            "{{id}}",
            id.toString()
          )
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
}

export default RestaurantApi;
