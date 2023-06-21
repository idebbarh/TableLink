import axios from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class PlateApi {
  static async getRestaurantMenu(id: string | number) {
    const res = await axios.get(
      baseUrl +
        apiEndpoints.plates.getRestaurantPlatesById.replace(
          "{{id}}",
          id.toString()
        )
    );
    return res.data;
  }
}

export default PlateApi;
