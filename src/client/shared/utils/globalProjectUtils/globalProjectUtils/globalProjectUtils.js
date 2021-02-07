export function getFormattedHttpReqError(error) {
  if (error?.data?.errors?.length > 0) {
    return error.data.errors.reduce((accum, error) => {
      return `${accum}${error.field}: ${error.defaultMessage}, `;
    }, '');
  } else if (error?.data?.message) {
    return error?.data?.message;
  } else {
    return error?.toString() || 'ERROR';
  }
}
