import { mockGetRequest } from '@client/connectivity/connectivityUtils';
import { getMockDataRoutes } from '@client/connectivity/routes/mockDataRoutes/mockDataRoutesUtils';
import { API_URL, getBaseRequestConfig } from '../baseRequestConfig';

export function fetchRoute(route, languageCode) {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `${API_URL}/${route.apiKey}`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  //return httpRequest(requestConfig);
  return mockGetRequest(10, getMockDataRoutes(route.reducerKey, languageCode));
}
