import axios from "axios";
import { SERVER_IP, SERVER_PORT } from "../constants/Constants";

const api = `http://${SERVER_IP}:${SERVER_PORT}/api/calculator`;

const instance = axios.create({
  baseURL: api,
});

class CalculatorService {
  static async calculate(data) {
    try {
      const res = await instance.post(`/calculate`, data);

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
  return {
    data: null,
    hasError: true,
    error: err.response.data,
  };
};

export default CalculatorService;
