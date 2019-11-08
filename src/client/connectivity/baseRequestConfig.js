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

const LOCAL_BASE_PATH = process.env.API_URL;

export { getBaseRequestConfig, LOCAL_BASE_PATH };
