import axios, { AxiosError } from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class PlateApi {
  static async getRestaurantMenu(id: string | number) {
    try {
      const res = await axios.get(
        baseUrl +
          apiEndpoints.plates.getRestaurantPlatesById.replace(
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

export default PlateApi;
