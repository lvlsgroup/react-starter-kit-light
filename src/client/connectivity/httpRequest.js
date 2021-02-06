import axios from 'axios';
import HttpApiCallError from './HttpApiCallError';

export default function httpRequest(requestConfig = {}) {
  return axios(requestConfig).then(
    (response) => {
      return response;
    },
    (responseError) => {
      const error = responseError?.response;
      const customError = new HttpApiCallError(
        error?.statusText,
        error?.status,
        error?.data
      );

      throw customError;
    }
  );
}
