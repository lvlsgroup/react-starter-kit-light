import { removeCookie } from '@client/shared/utils/generalUtils/cookieUtils/cookieUtils';
import { getFormattedHttpReqError } from '@client/shared/utils/globalProjectUtils/globalProjectUtils/globalProjectUtils';
import { isClient } from '@client/shared/utils/generalUtils/generalUtils/generalUtils';

// If Promise.reject we let the node server handle the error (renderUtils.js -> preloadDataErrorHandler)
export function handleApiError(dispatch, error, actionType) {
  if (error?.status === 401) {
    if (isClient()) {
      removeCookie('accessToken');
      window.location.replace('/login');
    } else {
      // Let the node server handle the redirect
      return Promise.reject(error);
    }
  } else {
    if (isClient()) {
      const errorMessage = getFormattedHttpReqError(error);
      window.alert(errorMessage);
    }

    return dispatch({
      type: actionType,
      payload: error,
      error: error,
    });
  }
}
