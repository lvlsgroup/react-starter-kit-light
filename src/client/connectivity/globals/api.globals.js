import { mockGetRequest } from '@client/connectivity/connectivityUtils';
import { getGlobalsMockData } from '@client/connectivity/globals/mockDataGlobals/mockDataGlobalsUtils';
import { getBaseRequestConfig, API_URL } from '../baseRequestConfig';
import httpRequest from '../httpRequest';

export function fetchGlobals(languageCode) {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `${API_URL}/articles`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  //return httpRequest(requestConfig);
  return mockGetRequest(100, getGlobalsMockData(languageCode));
}
