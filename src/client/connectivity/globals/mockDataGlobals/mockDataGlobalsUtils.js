import { LANGUAGES } from '@client/shared/utils/globalProjectUtils/copyUtils/copyUtils';
import sv_globals from '@client/connectivity/globals/mockDataGlobals/sv_RoutesMockData/sv_globals';
import en_globals from '@client/connectivity/globals/mockDataGlobals/en_RoutesMockData/en_globals';

export function getGlobalsMockData(slug, languageCode) {
  if (languageCode === LANGUAGES.sv) {
    return en_globals[slug];
  } else {
    // eslint-disable-next-line no-undef
    return sv_globals[slug];
  }
}
