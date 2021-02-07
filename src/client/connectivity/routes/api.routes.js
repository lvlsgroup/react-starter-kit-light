import { mockGetRequest } from '@client/connectivity/connectivityUtils';
import sv_allCopy from '@client/connectivity/routes/mockDataRoutes/sv_RoutesMockData/sv_allCopy';
import httpRequest from '../httpRequest';
import { getBaseRequestConfig, API_URL } from '../baseRequestConfig';

export function fetchRoute(route) {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `${API_URL}/${route.apiKey}`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  //return httpRequest(requestConfig);
  return mockGetRequest(10, getMockData(route.reducerKey));
}

function getMockData(slug) {
  return sv_allCopy[slug];
}
