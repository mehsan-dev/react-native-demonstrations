import axios from "axios";
import { SERVER_IP, SERVER_PORT } from "../constants/Constants";

const api = `http://${SERVER_IP}:${SERVER_PORT}/api/user`;

const instance = axios.create({
  baseURL: api,
});

class AuthService {
  static async register(data) {
    try {
      const res = await instance.post(`/signup`, data);
      return formatAPiData(res);
    } catch (error) {
      return formatApiError(error);
    }
  }

  static async login(data) {
    try {
      const res = await instance.post(`/login`, data);
      return formatAPiData(res);
    } catch (error) {
      return formatApiError(error);
    }
  }

  static async forgotPassword(data) {
    try {
      const res = await instance.post(`/forgot-password`, data);
      return formatAPiData(res);
    } catch (error) {
      return formatApiError(error);
    }
  }

  static async resetPassword(data) {
    try {
      const res = await instance.post(`/reset-password`, data);
      return formatAPiData(res);
    } catch (error) {
      return formatApiError(error);
    }
  }
}

const formatAPiData = (res) => {
  return {
    data: res.data,
    hasError: false,
    error: null,
  };
};

const formatApiError = (err) => {
  console.log(err);
  return {
    data: null,
    hasError: true,
    error: err.response.data,
  };
};

export default AuthService;
