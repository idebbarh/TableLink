import axios from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class RestaurantApi {
  static async getAllRestaurants() {
    const res = await axios.get(
      baseUrl + apiEndpoints.restaurants.getAllRestaurants
    );
    return res.data;
  }
  static async getRestaurant(id: number | string) {
    const res = await axios.get(
      baseUrl +
        apiEndpoints.restaurants.getRestaurantById.replace(
          "{{id}}",
          id.toString()
        )
    );
    return res.data;
  }
}

export default RestaurantApi;
