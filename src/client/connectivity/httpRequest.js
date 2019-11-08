import axios from 'axios';
import HttpApiCallError from './HttpApiCallError';

export default function httpRequest(requestConfig = {}) {
  return axios(requestConfig).then(
    (response) => {
      return response;
    },
    (responseWithError) => {
      const data =
        responseWithError &&
        responseWithError.response &&
        responseWithError.response.data;

      const error = new HttpApiCallError(
        responseWithError.statusText,
        responseWithError.status,
        data
      );

      throw error;
    }
  );
}
