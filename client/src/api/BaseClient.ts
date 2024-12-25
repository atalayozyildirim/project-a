import axios from "axios";
import { AxiosRequestConfig } from "axios";

const baseClient = (req: AxiosRequestConfig) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx.ingress-nginx-controller.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export default baseClient;
