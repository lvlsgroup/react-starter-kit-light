function getBaseRequestConfig(accessToken, contentType = 'application/json') {
  const config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': contentType,
    },
    timeout: 6000,
  };

  if (accessToken) {
    config.headers['Access-Token'] = `${accessToken}`;
  }

  return config;
}

const API_URL = process.env.API_URL;

export { getBaseRequestConfig, API_URL };
