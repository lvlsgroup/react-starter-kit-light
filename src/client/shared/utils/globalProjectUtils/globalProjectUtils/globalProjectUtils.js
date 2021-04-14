export function getFormattedHttpReqError(error) {
  const errorCodeFormat =
    error?.status || error?.data?.errorCode || error?.errorCode;
  const errorFromErrorCode = getErrorFromErrorCode(errorCodeFormat);
  if (errorFromErrorCode) {
    return errorFromErrorCode;
  } else if (error?.data?.errors?.length > 0) {
    return error.data.errors.reduce((accum, error) => {
      return `${accum}${error.field}: ${error.defaultMessage}, `;
    }, '');
  } else if (error?.data?.errors?.description) {
    return error?.data?.errors?.description;
  } else if (error?.data?.message) {
    return error?.data?.message;
  } else {
    return error?.toString() || 'ERROR';
  }
}

function getErrorFromErrorCode(errorCode) {
  // TODO implement error codes with localization
  const errorCodesEnabled = false;
  if (!errorCode || !errorCodesEnabled) {
    return;
  }
  switch (errorCode) {
    case 0: // General error
      return '';
    case 101:
      return '';
    case 102:
      return '';
    case 103:
      return '';
    case 104:
      return '';
    case 105:
      return '';
    case 106:
      return '';
    case 107:
      return '';
    case 108:
      return '';
    case 109:
      return '';
    case 110:
      return '';
    case 111:
      return '';
    case 112:
      return '';
    case 113:
      return '';
    case 114:
      return '';
    case 115:
      return '';
    case 116:
      return '';
    case 117:
      return '';
    case 118:
      return '';
    case 201:
      return '';
    case 202:
      return '';
    case 203:
      return '';
    case 301:
      return '';
    case 302:
      return '';
    case 303:
      return '';
    case 304:
      return '';
    case 305:
      return '';
    case 306:
      return '';
    case 307:
      return '';
    case 308:
      return '';
    case 401:
      return '';
    case 402:
      return '';
    case 403:
      return '';
    case 404:
      return '';
    case 405:
      return '';
    case 406:
      return '';
    case 407:
      return '';
    case 408:
      return '';
    case 409:
      return '';
    case 410:
      return '';
    case 411:
      return '';
    case 412:
      return '';
    case 413:
      return '';
    case 414:
      return '';
    case 415:
      return '';
    case 416:
      return '';
    case 417:
      return '';
    case 418:
      return '';
    case 501:
      return '';
    case 502:
      return '';
    case 503:
      return '';
    case 504:
      return '';
    case 505:
      return '';
    case 506:
      return '';
    case 507:
      return '';
    case 508:
      return '';
    case 509:
      return '';
    case 510:
      return '';
    case 511:
      return '';
    case 601:
      return '';
    case 602:
      return '';
    case 603:
      return '';
    case 701:
      return '';
    case 702:
      return '';
    case 703:
      return '';
    case 704:
      return '';
    case 901:
      return '';
    case 902:
      return '';
    case 903:
      return '';
    case 904:
      return '';
    case 905:
      return '';
    case 906:
      return '';
    case 907:
      return '';
    case 908:
      return '';
    case 909:
      return '';
    case 910:
      return '';
    case 911:
      return '';
    case 912:
      return '';
    case 913:
      return '';
    case 914:
      return '';
    case 915:
      return '';
    case 916:
      return '';
    case 917:
      return '';
  }
}
