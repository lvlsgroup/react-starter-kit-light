export function mockGetRequest(delay, data, shouldFail, failType) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail ? reject('fail') : resolve(data);
    }, delay);
  })
    .then((response) => {
      return {
        data: response,
      };
    })
    .catch((err) => {
      return {
        type: failType,
        response: err,
      };
    });
}
