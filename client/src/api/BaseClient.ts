import axios from "axios";

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
export default baseClient;
