import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  headers: {
    'Content-Type': 'application/json',
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    console.log('Starting Request', request);
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.data.data && response.data.data.accessToken) {
    //   api.defaults.headers.common["authorization"] =
    //     "Bearer " + response.data.data.accessToken;
    // }
    console.log('Response:', response.data);
    return response.data;
  },
  function (error) {
    error = error.response.data;
    console.log('RESPONSE ERROR', error);
    let errorMsg = error.message || '';
    if (error.errors && error.errors.message)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      errorMsg = errorMsg + ': ' + error.errors.message;

    return Promise.reject(error);
  }
);

export default api;
