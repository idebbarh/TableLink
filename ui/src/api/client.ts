import axios from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class ClientApi {
  static async checkAvailability(
    id: string | number,
    date: string,
    token: string
  ) {
    const res = await axios.post(
      baseUrl +
        apiEndpoints.client.checkAvailability.replace("{{id}}", id.toString()),
      { date },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
  static async makeReservation(
    id: string | number,
    data: { date: string; time: string; guests: number },
    token: string
  ) {
    const res = await axios.post(
      baseUrl +
        apiEndpoints.client.makeReservation.replace("{{id}}", id.toString()),
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
}
export default ClientApi;
