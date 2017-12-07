import { AxiosAdapter, AxiosRequestConfig } from "axios";

export default class MockAdapterFactory {
  public static mockData = [{
    id: 1,
    title: "Some Article",
  }];

  public static mockAdapter: AxiosAdapter = (config: AxiosRequestConfig) =>
    new Promise((resolve, reject) => {
      resolve({
        data: MockAdapterFactory.mockData,
        status: 200,
        then: null,
      });
    })
}
