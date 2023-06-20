import axios from "axios";
import apiEndpoints, { baseUrl } from "./apiEndpoints";

class AuthApi {
  static async getUser<T>(data: T) {
    const res = await axios.post(baseUrl + apiEndpoints.auth.login, data);
    return res.data;
  }
  static async createUser<T>(data: T) {
    const res = await axios.post(baseUrl + apiEndpoints.auth.signup, data);
    return res.data;
  }
}

export default AuthApi;
