import axios from "axios";
<<<<<<< HEAD

const baseClient = (context: unknown) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: {
        Host: "tickets.dev",
        Cookie: (context as { req: { headers: { cookie: string } } }).req
          .headers.cookie,
      },
    });
  }
  return axios.create({
    baseURL: "/",
  });
};
=======
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

>>>>>>> 3e97845f70544a2fae8c5cc480265c9eede2d180
export default baseClient;
