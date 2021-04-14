import { LANGUAGES } from '@client/shared/utils/globalProjectUtils/copyUtils/copyUtils';
import sv_globals from '@client/connectivity/globals/mockDataGlobals/sv_RoutesMockData/sv_globals';
import en_globals from '@client/connectivity/globals/mockDataGlobals/en_RoutesMockData/en_globals';

export function getGlobalsMockData(languageCode) {
  if (languageCode === LANGUAGES.sv) {
    return sv_globals;
  } else {
    // eslint-disable-next-line no-undef
    return en_globals;
  }
}
