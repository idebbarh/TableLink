import axios, { AxiosError } from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class WaiterApi {
  static async getAvailability(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.waiter.getAvailibility,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async toggleAvailability(token: string) {
    try {
      const res = await axios.put(
        baseUrl + apiEndpoints.waiter.toggleAvailability,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
}

export default WaiterApi;
