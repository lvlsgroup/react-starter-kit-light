export function getFormattedHttpReqError(error) {
  const errorFromErrorCode = getErrorFromErrorCode(error?.data?.errorCode);
  if (errorFromErrorCode) {
    return errorFromErrorCode;
  } else if (error?.data?.errors?.length > 0) {
    return error.data.errors.reduce((accum, error) => {
      return `${accum}${error.field}: ${error.defaultMessage}, `;
    }, '');
  } else if (error?.data?.errors?.description) {
    return error.data.errors.description;
  } else if (error?.data?.message) {
    return error.data.message;
  } else {
    return error?.toString() || 'ERROR';
  }
}

function getErrorFromErrorCode(errorCode) {
  // TODO implement error codes with localization
  if (!errorCode) {
    return;
  }
  switch (errorCode) {
    case 0: // General error
      return 'Something went wrong, please try again';
  }
}
