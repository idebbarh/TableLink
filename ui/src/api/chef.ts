import axios, { AxiosError } from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class ChefApi {
  static async getAvailability(token: string) {
    try {
      const res = await axios.get(baseUrl + apiEndpoints.chef.getAvailibility, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async toggleAvailability(token: string) {
    try {
      const res = await axios.put(
        baseUrl + apiEndpoints.chef.toggleAvailability,
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
  static async getCommandsToCook(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.chef.getCommandsToCook,
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
  static async setCommandAsCooked(id: number | string, token: string) {
    try {
      const res = await axios.put(
        baseUrl +
          apiEndpoints.chef.setCommandAsCooked.replace("{{id}}", id.toString()),
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

export default ChefApi;
