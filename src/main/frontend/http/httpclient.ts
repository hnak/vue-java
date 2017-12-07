// Framework
import Axios, { AxiosAdapter, AxiosRequestConfig } from "axios";
import MockAdapter from "./mockadapterfactory";

declare let process: {
  env: {
    NODE_ENV: string;
  };
};

const URL = "http://localhost:3000";
const HTTP = Axios.create({
  baseURL: URL,
  withCredentials: true,
  xsrfHeaderName: "X-CSRF-Token",
});
const myadapter: AxiosAdapter = (process.env.NODE_ENV === "api-mock") ? MockAdapter.mockAdapter : HTTP.defaults.adapter;

export default class HttpClient {

  public static getUser(userId): string {
    HTTP.get("/user", {
      adapter: myadapter,
      params: {
        userId,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
    return null;
  }
}
