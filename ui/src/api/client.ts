import axios, { AxiosError } from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class ClientApi {
  static async checkAvailability(
    id: string | number,
    date: string,
    token: string
  ) {
    try {
      const res = await axios.post(
        baseUrl +
          apiEndpoints.client.checkAvailability.replace(
            "{{id}}",
            id.toString()
          ),
        { date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async makeReservation(
    id: string | number,
    data: { date: string; time: string; guests: number },
    token: string
  ) {
    try {
      const res = await axios.post(
        baseUrl +
          apiEndpoints.client.makeReservation.replace("{{id}}", id.toString()),
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async makeReview(id: string | number, rating: number, token: string) {
    try {
      const res = await axios.post(
        baseUrl +
          apiEndpoints.client.makeReview.replace("{{id}}", id.toString()),
        {
          rating: rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
  static async getRate(id: string | number, token: string) {
    try {
      const res = await axios.get(
        baseUrl + apiEndpoints.client.getRate.replace("{{id}}", id.toString()),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      const errValue = (err as AxiosError)?.response?.data;
      throw errValue as MyKnownError;
    }
  }
}
export default ClientApi;
