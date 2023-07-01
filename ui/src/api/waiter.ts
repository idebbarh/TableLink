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
  static async makeCommand(id: number | string, token: string) {
    try {
      const res = await axios.post(
        baseUrl + apiEndpoints.waiter.makeCommand,
        { plate_id: id },
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

  static async getCommandsToServe(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.waiter.getCommandsToServe,
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

  static async getCommandsToPay(token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.waiter.getCommandsToPay,
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

  static async setCommandAsServed(id: number | string, token: string) {
    try {
      const res = await axios.put(
        baseUrl +
          apiEndpoints.waiter.setCommandAsServed.replace(
            "{{id}}",
            id.toString()
          ),
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

  static async setCommandAsPayed(id: number | string, token: string) {
    try {
      const res = await axios.put(
        baseUrl +
          apiEndpoints.waiter.setCommandAsPayed.replace(
            "{{id}}",
            id.toString()
          ),
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
