import { mockGetRequest } from '@client/connectivity/connectivityUtils';
import sv_globals from '@client/connectivity/globals/mockDataGlobals/sv_RoutesMockData/sv_globals';
import httpRequest from '../httpRequest';
import { getBaseRequestConfig, API_URL } from '../baseRequestConfig';

export function fetchGlobals() {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `${API_URL}/articles`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  //return httpRequest(requestConfig);
  return mockGetRequest(300, sv_globals);
}
