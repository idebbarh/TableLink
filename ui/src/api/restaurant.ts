import axios from "axios";
import apiEndpoints from "./apiEndpoints";

class RestaurantApi {
  static async getAllRestaurants() {
    const res = await axios.get(apiEndpoints.restaurants.getAllRestaurants);
    return res.data;
  }
  static async getRestaurant(id: number) {
    const res = await axios.get(
      apiEndpoints.restaurants.getRestaurantById.replace(
        "{{id}}",
        id.toString()
      )
    );
    return res.data;
  }
}

export default RestaurantApi;
