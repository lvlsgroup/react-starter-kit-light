import httpRequest from './httpRequest';
import { getBaseRequestConfig, API_URL } from './baseRequestConfig';

export function fetchPageContent(page) {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `${API_URL}/${page}`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  return httpRequest(requestConfig);
}
