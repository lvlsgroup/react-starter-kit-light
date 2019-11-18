function getBaseRequestConfig() {
  const config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 6000,
  };

  return config;
}

const API_URL = process.env.API_URL;

export { getBaseRequestConfig, API_URL };
